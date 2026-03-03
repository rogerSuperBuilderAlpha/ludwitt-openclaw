import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { logger } from '@/lib/logger'

export function useFollow(currentUserId: string | undefined, targetUserId: string | undefined) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)

  useEffect(() => {
    if (!currentUserId || !targetUserId) {
      setLoading(false)
      return
    }

    // Check if currently following
    const checkFollowing = async () => {
      try {
        const followDoc = await getDoc(
          doc(db, 'userFollows', `${currentUserId}_${targetUserId}`)
        )
        setIsFollowing(followDoc.exists())
      } catch (error) {
        logger.error('Usefollow', 'Failed to check following status', { error: error })
      } finally {
        setLoading(false)
      }
    }

    checkFollowing()

    // Real-time follower count
    const followersQuery = query(
      collection(db, 'userFollows'),
      where('followingId', '==', targetUserId)
    )

    const unsubFollowers = onSnapshot(followersQuery, (snapshot) => {
      setFollowerCount(snapshot.size)
    })

    // Real-time following count
    const followingQuery = query(
      collection(db, 'userFollows'),
      where('followerId', '==', targetUserId)
    )

    const unsubFollowing = onSnapshot(followingQuery, (snapshot) => {
      setFollowingCount(snapshot.size)
    })

    return () => {
      unsubFollowers()
      unsubFollowing()
    }
  }, [currentUserId, targetUserId])

  const toggleFollow = async () => {
    if (!currentUserId || !targetUserId || currentUserId === targetUserId) return

    const followId = `${currentUserId}_${targetUserId}`

    try {
      if (isFollowing) {
        // Unfollow
        await deleteDoc(doc(db, 'userFollows', followId))
        setIsFollowing(false)
      } else {
        // Follow
        await setDoc(doc(db, 'userFollows', followId), {
          followerId: currentUserId,
          followingId: targetUserId,
          createdAt: new Date().toISOString(),
        })
        setIsFollowing(true)

        // Create notification for followed user
        await setDoc(doc(db, 'notifications', `follow_${followId}_${Date.now()}`), {
          userId: targetUserId,
          type: 'follow',
          fromUserId: currentUserId,
          read: false,
          createdAt: new Date().toISOString(),
        })
      }
    } catch (error) {
      logger.error('Usefollow', 'Failed to toggle follow', { error: error })
    }
  }

  return {
    isFollowing,
    loading,
    followerCount,
    followingCount,
    toggleFollow,
  }
}

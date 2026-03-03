'use client'

/**
 * Web3Modal Connect Button
 *
 * A button that opens the Web3Modal for wallet connection.
 * This is a separate component to handle SSR issues with useWeb3Modal hook.
 */

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Wallet, CircleNotch } from '@phosphor-icons/react'
import { useState } from 'react'

interface Web3ModalButtonProps {
  className?: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function Web3ModalButton({
  className,
  children,
  size = 'md',
}: Web3ModalButtonProps) {
  const { open } = useWeb3Modal()
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = async () => {
    setIsOpening(true)
    try {
      await open()
    } finally {
      // Small delay to prevent flashing
      setTimeout(() => setIsOpening(false), 500)
    }
  }

  const sizeClasses = {
    sm: 'b-btn-sm',
    md: '',
    lg: 'b-btn-lg',
  }

  return (
    <button
      onClick={handleClick}
      disabled={isOpening}
      className={`b-btn b-btn-logic ${sizeClasses[size]} ${className || ''}`}
    >
      {isOpening ? (
        <CircleNotch
          size={size === 'lg' ? 20 : 16}
          className="b-animate-spin"
        />
      ) : (
        <Wallet size={size === 'lg' ? 20 : 16} weight="fill" />
      )}
      {children || 'Connect Wallet'}
    </button>
  )
}

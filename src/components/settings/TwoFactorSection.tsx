'use client'

import { useState, useEffect, useCallback } from 'react'
import { User } from 'firebase/auth'
import {
  has2FAEnabled,
  getEnrolled2FAFactors,
  startPhone2FAEnrollment,
  completePhone2FAEnrollment,
  remove2FAFactor,
  clearRecaptchaVerifier,
} from '@/lib/firebase/auth'
import {
  Smartphone,
  Shield,
  ShieldCheck,
  Plus,
  Trash2,
  Check,
  Loader2,
  AlertTriangle,
  X,
  Phone,
} from 'lucide-react'
import { logger } from '@/lib/logger'

interface TwoFactorSectionProps {
  user: User
  onUserUpdate?: () => void
}

interface EnrolledFactor {
  uid: string
  displayName: string
  factorId: string
  enrollmentTime?: string
}

type SetupStep = 'idle' | 'phone' | 'verify' | 'success'

// Country codes for phone number dropdown
const COUNTRY_CODES = [
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+358', country: 'Finland', flag: '🇫🇮' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪' },
  { code: '+48', country: 'Poland', flag: '🇵🇱' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+30', country: 'Greece', flag: '🇬🇷' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+972', country: 'Israel', flag: '🇮🇱' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+51', country: 'Peru', flag: '🇵🇪' },
]

export function TwoFactorSection({
  user,
  onUserUpdate,
}: TwoFactorSectionProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [enrolledFactors, setEnrolledFactors] = useState<EnrolledFactor[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Setup flow state
  const [setupStep, setSetupStep] = useState<SetupStep>('idle')
  const [countryCode, setCountryCode] = useState('+1')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationId, setVerificationId] = useState<string | null>(null)

  // Remove confirmation
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null)

  const refreshFactors = useCallback(() => {
    try {
      const enabled = has2FAEnabled(user)
      setIsEnabled(enabled)

      if (enabled) {
        const factors = getEnrolled2FAFactors(user)
        setEnrolledFactors(factors)
      } else {
        setEnrolledFactors([])
      }
    } catch (err) {
      logger.error('TwoFactorSection', 'Error checking 2FA status', {
        error: err,
      })
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    refreshFactors()
  }, [refreshFactors])

  const handleStartSetup = () => {
    setSetupStep('phone')
    setPhoneNumber('')
    setVerificationCode('')
    setError(null)
    setSuccess(null)
  }

  const handleCancelSetup = () => {
    setSetupStep('idle')
    setPhoneNumber('')
    setVerificationCode('')
    setVerificationId(null)
    setError(null)
    clearRecaptchaVerifier()
  }

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number')
      return
    }

    // Combine country code with phone number
    const cleanPhoneDigits = phoneNumber.replace(/[\s-]/g, '')
    const fullPhoneNumber = `${countryCode}${cleanPhoneDigits}`

    setActionLoading('send')
    setError(null)

    try {
      const verId = await startPhone2FAEnrollment(
        fullPhoneNumber,
        'recaptcha-container-2fa'
      )
      setVerificationId(verId)
      setSetupStep('verify')
      setSuccess('Verification code sent! Check your phone.')
    } catch (err: unknown) {
      logger.error('TwoFactorSection', 'Error sending verification code', {
        error: err,
      })
      const errCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : undefined
      const errMessage = err instanceof Error ? err.message : String(err)
      if (errCode === 'auth/operation-not-allowed') {
        setError(
          'SMS-based 2FA is not yet configured. Please contact support to enable this feature.'
        )
        setSetupStep('idle')
      } else if (errCode === 'auth/invalid-phone-number') {
        setError(
          'Invalid phone number format. Include country code (e.g., +1 for US)'
        )
      } else if (errCode === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.')
      } else if (errCode === 'auth/requires-recent-login') {
        setError(
          'For security, please sign out and sign back in before enabling 2FA.'
        )
      } else {
        setError(errMessage || 'Failed to send verification code')
      }
    } finally {
      setActionLoading(null)
    }
  }

  const handleVerifyCode = async () => {
    if (!verificationCode.trim() || verificationCode.length !== 6) {
      setError('Please enter the 6-digit verification code')
      return
    }

    setActionLoading('verify')
    setError(null)

    try {
      await completePhone2FAEnrollment(verificationCode, 'Phone')
      setSetupStep('success')
      setSuccess('Two-factor authentication enabled successfully!')

      // Refresh to show the new factor
      setTimeout(() => {
        refreshFactors()
        setSetupStep('idle')
        onUserUpdate?.()
      }, 2000)
    } catch (err: unknown) {
      logger.error('TwoFactorSection', 'Error verifying code', { error: err })
      const errCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : undefined
      const errMessage = err instanceof Error ? err.message : String(err)
      if (errCode === 'auth/invalid-verification-code') {
        setError('Invalid verification code. Please try again.')
      } else if (errCode === 'auth/code-expired') {
        setError('Verification code expired. Please request a new code.')
        setSetupStep('phone')
      } else {
        setError(errMessage || 'Failed to verify code')
      }
    } finally {
      setActionLoading(null)
    }
  }

  const handleRemoveFactor = async (factorUid: string) => {
    setActionLoading(factorUid)
    setError(null)
    setConfirmRemove(null)

    try {
      await remove2FAFactor(factorUid)
      setSuccess('Two-factor authentication removed.')
      refreshFactors()
      onUserUpdate?.()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: unknown) {
      logger.error('TwoFactorSection', 'Error removing 2FA', { error: err })
      const errCode =
        err instanceof Error && 'code' in err
          ? (err as { code: string }).code
          : undefined
      const errMessage = err instanceof Error ? err.message : String(err)
      if (errCode === 'auth/requires-recent-login') {
        setError(
          'For security, please sign out and sign back in before removing 2FA.'
        )
      } else {
        setError(errMessage || 'Failed to remove 2FA')
      }
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin b-text-muted" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container-2fa" />

      {/* Error/Success Messages */}
      {error && (
        <div className="b-feedback b-feedback-error b-text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {success && (
        <div className="b-feedback b-feedback-success b-text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* 2FA Status Card */}
      <div
        className={`b-p-lg b-rounded-lg border-2 ${
          isEnabled
            ? 'b-bg-success-light border-green-200'
            : 'b-bg-muted b-border'
        }`}
      >
        <div className="flex items-center gap-3">
          {isEnabled ? (
            <ShieldCheck className="w-8 h-8 b-text-success" />
          ) : (
            <Shield className="w-8 h-8 b-text-muted" />
          )}
          <div className="flex-1">
            <h3
              className={`b-font-semibold ${isEnabled ? 'b-text-success-dark' : 'b-text-primary'}`}
            >
              {isEnabled
                ? 'Two-Factor Authentication Enabled'
                : 'Two-Factor Authentication'}
            </h3>
            <p className="b-text-sm b-text-secondary">
              {isEnabled
                ? 'Your account is protected with an additional layer of security.'
                : 'Add an extra layer of security to your account with SMS verification.'}
            </p>
          </div>
        </div>
      </div>

      {/* Enrolled Factors */}
      {enrolledFactors.length > 0 && (
        <div className="space-y-2">
          <h4 className="b-text-sm b-font-medium b-text-secondary">
            Enrolled Devices
          </h4>
          {enrolledFactors.map((factor) => (
            <div
              key={factor.uid}
              className="flex items-center justify-between b-p-md b-card"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 b-text-success" />
                <div>
                  <p className="b-font-medium b-text-primary">
                    {factor.displayName}
                  </p>
                  {factor.enrollmentTime && (
                    <p className="b-text-xs b-text-muted">
                      Added{' '}
                      {new Date(factor.enrollmentTime).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {confirmRemove === factor.uid ? (
                <div className="flex items-center gap-2">
                  <span className="b-text-xs b-text-secondary">Remove?</span>
                  <button
                    onClick={() => handleRemoveFactor(factor.uid)}
                    disabled={actionLoading === factor.uid}
                    className="px-2 py-1 b-text-xs b-font-medium b-text-error b-bg-error-light b-rounded hover:opacity-80 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === factor.uid ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      'Yes'
                    )}
                  </button>
                  <button
                    onClick={() => setConfirmRemove(null)}
                    className="px-2 py-1 b-text-xs b-font-medium b-text-secondary b-bg-muted b-rounded hover:opacity-80 transition-colors"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmRemove(factor.uid)}
                  className="flex items-center gap-1.5 px-3 py-1.5 b-text-sm b-text-secondary hover:b-text-error hover:b-bg-error-light b-rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Setup Flow */}
      {setupStep === 'idle' && !isEnabled && (
        <button
          onClick={handleStartSetup}
          className="b-btn b-btn-logic b-btn-full b-btn-lg"
        >
          <Plus className="w-5 h-5" />
          Enable Two-Factor Authentication
        </button>
      )}

      {/* Phone Number Input Step */}
      {setupStep === 'phone' && (
        <div className="b-card b-p-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 b-text-logic" />
              <h4 className="b-font-medium b-text-primary">Add Phone Number</h4>
            </div>
            <button
              onClick={handleCancelSetup}
              className="p-1 hover:b-bg-muted b-rounded-lg transition-colors"
            >
              <X className="w-5 h-5 b-text-muted" />
            </button>
          </div>

          <p className="b-text-sm b-text-secondary">
            Enter your phone number to receive verification codes.
          </p>

          <div>
            <label
              htmlFor="phone-number-2fa"
              className="block b-text-sm b-font-medium b-text-secondary b-mb-sm"
            >
              Phone Number
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="b-input w-36 flex-shrink-0"
                aria-label="Country code"
              >
                {COUNTRY_CODES.map((c, idx) => (
                  <option key={`${c.code}-${c.country}-${idx}`} value={c.code}>
                    {c.flag} {c.country} ({c.code})
                  </option>
                ))}
              </select>
              <input
                id="phone-number-2fa"
                type="tel"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^\d\s-]/g, ''))
                }
                placeholder="555 123 4567"
                className="b-input flex-1"
              />
            </div>
            <p className="b-text-xs b-text-muted b-mt-sm">
              Select your country, then enter your phone number without the
              country code
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCancelSetup}
              className="b-btn b-btn-secondary b-btn-md flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSendCode}
              disabled={actionLoading === 'send' || !phoneNumber.trim()}
              className="b-btn b-btn-logic b-btn-md flex-1 flex items-center justify-center gap-2"
            >
              {actionLoading === 'send' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Code'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Verification Code Step */}
      {setupStep === 'verify' && (
        <div className="b-card b-p-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 b-text-logic" />
              <h4 className="b-font-medium b-text-primary">
                Enter Verification Code
              </h4>
            </div>
            <button
              onClick={handleCancelSetup}
              className="p-1 hover:b-bg-muted b-rounded-lg transition-colors"
            >
              <X className="w-5 h-5 b-text-muted" />
            </button>
          </div>

          <p className="b-text-sm b-text-secondary">
            Enter the 6-digit code sent to <strong>{phoneNumber}</strong>
          </p>

          <div>
            <label
              htmlFor="verification-code-2fa"
              className="block b-text-sm b-font-medium b-text-secondary b-mb-sm"
            >
              Verification Code
            </label>
            <input
              id="verification-code-2fa"
              type="text"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(
                  e.target.value.replace(/\D/g, '').slice(0, 6)
                )
              }
              placeholder="123456"
              maxLength={6}
              className="b-input w-full text-center b-text-2xl tracking-widest font-mono"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setSetupStep('phone')}
              className="b-btn b-btn-secondary b-btn-md flex-1"
            >
              Back
            </button>
            <button
              onClick={handleVerifyCode}
              disabled={
                actionLoading === 'verify' || verificationCode.length !== 6
              }
              className="b-btn b-btn-logic b-btn-md flex-1 flex items-center justify-center gap-2"
            >
              {actionLoading === 'verify' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Enable'
              )}
            </button>
          </div>

          <button
            onClick={handleSendCode}
            disabled={actionLoading === 'send'}
            className="w-full b-text-sm b-text-logic hover:b-text-logic-dark b-font-medium"
          >
            Didn&apos;t receive code? Send again
          </button>
        </div>
      )}

      {/* Success Step */}
      {setupStep === 'success' && (
        <div className="b-p-xl b-bg-success-light b-border b-border-success b-rounded-lg text-center">
          <ShieldCheck className="w-12 h-12 b-text-success mx-auto b-mb-md" />
          <h4 className="b-font-semibold b-text-success-dark b-mb-sm">
            2FA Enabled!
          </h4>
          <p className="b-text-sm b-text-success-dark">
            Your account is now protected with two-factor authentication.
          </p>
        </div>
      )}

      {/* Security Note */}
      <div className="pt-4 b-border-t">
        <p className="b-text-xs b-text-muted">
          <strong>How it works:</strong> When you sign in, you&apos;ll enter
          your password and then receive a verification code on your phone. This
          ensures only you can access your account, even if someone knows your
          password.
        </p>
      </div>
    </div>
  )
}

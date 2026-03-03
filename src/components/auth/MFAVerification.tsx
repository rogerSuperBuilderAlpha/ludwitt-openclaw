'use client'

import { ShieldIcon } from '@/components/auth/LoginIcons'

interface MFAVerificationProps {
  mfaCode: string
  onMfaCodeChange: (code: string) => void
  onVerify: () => void
  onCancel: () => void
  isLoading: boolean
  phoneHint: string
}

export function MFAVerification({
  mfaCode,
  onMfaCodeChange,
  onVerify,
  onCancel,
  isLoading,
  phoneHint,
}: MFAVerificationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldIcon className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
        <p className="text-gray-500 text-sm">
          Enter the code sent to {phoneHint}
        </p>
      </div>

      <div>
        <input
          type="text"
          value={mfaCode}
          onChange={(e) => onMfaCodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] font-mono bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="000000"
          maxLength={6}
          autoComplete="one-time-code"
        />
      </div>

      <button
        onClick={onVerify}
        disabled={isLoading || mfaCode.length !== 6}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Verifying...' : 'Verify & Sign In'}
      </button>

      <button
        onClick={onCancel}
        className="w-full text-sm text-gray-500 hover:text-gray-700"
      >
        Cancel and try again
      </button>
    </div>
  )
}

import { FirestoreTimestamp } from './timestamp'

/**
 * Common type for date formatting callback functions used across
 * customer and developer dashboard components.
 */
export type DateFormatter = (
  date: FirestoreTimestamp | Date | string | number | { seconds: number }
) => string

/**
 * Extended Window interface for browsers with an Ethereum provider (EIP-1193).
 * Used by wallet detection hooks and PWA utilities.
 */
export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  isMetaMask?: boolean
  isCoinbaseWallet?: boolean
  isCoinbaseBrowser?: boolean
  isTrust?: boolean
  isTrustWallet?: boolean
  isRabby?: boolean
  isRainbow?: boolean
  isBraveWallet?: boolean
  providers?: EthereumProvider[]
}

export interface WindowWithEthereum extends Window {
  ethereum?: EthereumProvider
}

/**
 * Extended Navigator interface for iOS Safari standalone mode detection.
 */
export interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean
}

/**
 * SpeechRecognition event result types for Web Speech API.
 * These are not yet well-typed in all TypeScript DOM libs.
 */
export interface SpeechRecognitionResult {
  readonly isFinal: boolean
  readonly length: number
  readonly [index: number]: {
    readonly transcript: string
    readonly confidence: number
  }
}

export interface SpeechRecognitionResultList {
  readonly length: number
  readonly [index: number]: SpeechRecognitionResult
}

export interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultList
}

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string
  readonly message: string
}

export interface SpeechRecognitionInstance {
  continuous: boolean
  interimResults: boolean
  lang: string
  onstart: ((event: Event) => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

export type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: new () => SpeechRecognitionInstance
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance
}

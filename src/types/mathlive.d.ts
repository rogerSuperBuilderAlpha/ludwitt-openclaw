/**
 * Type declarations for MathLive web component
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string
          readonly?: boolean
          'virtual-keyboard-mode'?: 'auto' | 'manual' | 'off'
          'math-virtual-keyboard-policy'?: 'auto' | 'sandboxed'
          'smart-mode'?: boolean
          'smart-superscript'?: boolean
          'smart-fence'?: boolean
          'virtual-keyboards'?: string
          'placeholder'?: string
        },
        HTMLElement
      >
    }
  }
}

export {}

// Email service supporting SendGrid and Mailgun

export type EmailProvider = 'sendgrid' | 'mailgun'

export interface EmailConfig {
  provider: EmailProvider
  apiKey: string
  domain?: string // For Mailgun
  fromEmail: string
  fromName: string
}

export interface EmailMessage {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  cc?: string[]
  bcc?: string[]
  attachments?: {
    filename: string
    content: string | Buffer
    type?: string
  }[]
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * SendGrid email sender
 */
class SendGridSender {
  private apiKey: string
  private fromEmail: string
  private fromName: string

  constructor(config: EmailConfig) {
    this.apiKey = config.apiKey
    this.fromEmail = config.fromEmail
    this.fromName = config.fromName
  }

  async send(message: EmailMessage): Promise<EmailResult> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: Array.isArray(message.to)
                ? message.to.map((email) => ({ email }))
                : [{ email: message.to }],
              cc: message.cc?.map((email) => ({ email })),
              bcc: message.bcc?.map((email) => ({ email })),
            },
          ],
          from: {
            email: this.fromEmail,
            name: this.fromName,
          },
          reply_to: message.replyTo ? { email: message.replyTo } : undefined,
          subject: message.subject,
          content: [
            {
              type: 'text/html',
              value: message.html,
            },
            ...(message.text
              ? [{ type: 'text/plain', value: message.text }]
              : []),
          ],
          attachments: message.attachments?.map((att) => ({
            filename: att.filename,
            content:
              typeof att.content === 'string'
                ? att.content
                : att.content.toString('base64'),
            type: att.type || 'application/octet-stream',
          })),
        }),
      })

      if (response.ok) {
        const messageId = response.headers.get('x-message-id')
        return { success: true, messageId: messageId || undefined }
      } else {
        const error = await response.text()
        return { success: false, error }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

/**
 * Mailgun email sender
 */
class MailgunSender {
  private apiKey: string
  private domain: string
  private fromEmail: string
  private fromName: string

  constructor(config: EmailConfig) {
    this.apiKey = config.apiKey
    this.domain = config.domain || ''
    this.fromEmail = config.fromEmail
    this.fromName = config.fromName
  }

  async send(message: EmailMessage): Promise<EmailResult> {
    try {
      const formData = new FormData()
      formData.append('from', `${this.fromName} <${this.fromEmail}>`)

      const recipients = Array.isArray(message.to) ? message.to : [message.to]
      recipients.forEach((to) => formData.append('to', to))

      if (message.cc) {
        message.cc.forEach((cc) => formData.append('cc', cc))
      }

      if (message.bcc) {
        message.bcc.forEach((bcc) => formData.append('bcc', bcc))
      }

      if (message.replyTo) {
        formData.append('h:Reply-To', message.replyTo)
      }

      formData.append('subject', message.subject)
      formData.append('html', message.html)

      if (message.text) {
        formData.append('text', message.text)
      }

      if (message.attachments) {
        message.attachments.forEach((att) => {
          const blob = new Blob([att.content as BlobPart], { type: att.type })
          formData.append('attachment', blob, att.filename)
        })
      }

      const response = await fetch(
        `https://api.mailgun.net/v3/${this.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(`api:${this.apiKey}`)}`,
          },
          body: formData,
        }
      )

      if (response.ok) {
        const result = await response.json()
        return { success: true, messageId: result.id }
      } else {
        const error = await response.text()
        return { success: false, error }
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

/**
 * Email service
 */
export class EmailService {
  private sender: SendGridSender | MailgunSender

  constructor(config: EmailConfig) {
    if (config.provider === 'sendgrid') {
      this.sender = new SendGridSender(config)
    } else {
      this.sender = new MailgunSender(config)
    }
  }

  async send(message: EmailMessage): Promise<EmailResult> {
    return this.sender.send(message)
  }

  async sendBatch(messages: EmailMessage[]): Promise<EmailResult[]> {
    return Promise.all(messages.map((msg) => this.send(msg)))
  }
}

/**
 * Create email service from environment variables
 */
export function createEmailService(): EmailService {
  const provider = (process.env.EMAIL_PROVIDER || 'sendgrid') as EmailProvider
  const apiKey = process.env.EMAIL_API_KEY || ''
  const domain = process.env.EMAIL_DOMAIN
  const fromEmail = process.env.EMAIL_FROM || 'noreply@your-domain.com'
  const fromName = process.env.EMAIL_FROM_NAME || 'Ludwitt'

  if (!apiKey) {
    throw new Error('EMAIL_API_KEY environment variable is not set')
  }

  if (provider === 'mailgun' && (!domain || domain.trim() === '')) {
    throw new Error(
      'EMAIL_DOMAIN is required when using Mailgun. Set EMAIL_DOMAIN in your environment (e.g. mg.yourdomain.com).'
    )
  }

  return new EmailService({
    provider,
    apiKey,
    domain,
    fromEmail,
    fromName,
  })
}

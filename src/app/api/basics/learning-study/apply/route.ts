import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase/admin'
import { sendCustomEmail } from '@/lib/integrations/email/sender'
import { apiLogger } from '@/lib/logger'

interface StudyApplication {
  firstName: string
  lastName: string
  email: string
  gradeLevel: string
  currentSchool: string
  standardizedTests: string
  hoursPerDay: string
  parentEmail?: string
  additionalInfo?: string
}

export async function POST(request: NextRequest) {
  try {
    // Get authorization token
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!adminAuth || !adminDb) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(token)
    const userId = decodedToken.uid

    // Parse request body
    const body: StudyApplication = await request.json()

    // Validate required fields
    const requiredFields: (keyof StudyApplication)[] = [
      'firstName',
      'lastName', 
      'email',
      'gradeLevel',
      'currentSchool',
      'standardizedTests',
      'hoursPerDay'
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Store application in Firestore
    const applicationData = {
      ...body,
      userId,
      appliedAt: new Date().toISOString(),
      status: 'pending'
    }

    const docRef = await adminDb.collection('learning_study_applications').add(applicationData)

    // Send confirmation email to applicant
    const applicantEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #059669, #0891b2); padding: 30px; border-radius: 16px; text-align: center; margin-bottom: 30px;">
    <h1 style="color: white; margin: 0; font-size: 24px;">📊 Application Received!</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Learning Outcomes Study</p>
  </div>
  
  <p style="font-size: 16px;">Hi ${body.firstName},</p>
  
  <p style="font-size: 16px;">Thank you for applying to join our Learning Outcomes Study! We're excited about your interest in helping us understand how practice improves test scores.</p>
  
  <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h3 style="color: #166534; margin: 0 0 15px 0;">📋 Your Application Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #666;">Name:</td><td style="padding: 8px 0; font-weight: 600;">${body.firstName} ${body.lastName}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;">${body.email}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Grade Level:</td><td style="padding: 8px 0;">${body.gradeLevel}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">School:</td><td style="padding: 8px 0;">${body.currentSchool}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Tests Taken:</td><td style="padding: 8px 0;">${body.standardizedTests}</td></tr>
      <tr><td style="padding: 8px 0; color: #666;">Daily Commitment:</td><td style="padding: 8px 0;">${body.hoursPerDay}</td></tr>
    </table>
  </div>
  
  <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h3 style="color: #92400e; margin: 0 0 10px 0;">⏳ What's Next?</h3>
    <p style="color: #92400e; margin: 0;">We'll review your application and get back to you within 2-3 business days. If accepted, you'll start earning <strong>$100/month in credits</strong>!</p>
  </div>
  
  <p style="font-size: 16px;">If you have any questions, feel free to reply to this email.</p>
  
  <p style="font-size: 16px;">Best regards,<br><strong>The Ludwitt Team</strong></p>
  
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
    <p>Ludwitt - Helping students achieve their best</p>
  </div>
</body>
</html>
`

    const applicantEmailText = `
Hi ${body.firstName},

Thank you for applying to join our Learning Outcomes Study! We're excited about your interest in helping us understand how practice improves test scores.

YOUR APPLICATION DETAILS:
- Name: ${body.firstName} ${body.lastName}
- Email: ${body.email}
- Grade Level: ${body.gradeLevel}
- School: ${body.currentSchool}
- Tests Taken: ${body.standardizedTests}
- Daily Commitment: ${body.hoursPerDay}

WHAT'S NEXT?
We'll review your application and get back to you within 2-3 business days. If accepted, you'll start earning $100/month in credits!

If you have any questions, feel free to reply to this email.

Best regards,
The Ludwitt Team
`

    // Send email to applicant
    await sendCustomEmail({
      to: body.email,
      subject: '📊 Learning Outcomes Study - Application Received!',
      html: applicantEmailHtml,
      text: applicantEmailText,
      replyTo: process.env.LEARNING_STUDY_CONTACT_EMAIL || 'support@ludwitt.com'
    })

    // Send notification email to Roger
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #059669, #0891b2); padding: 30px; border-radius: 16px; text-align: center; margin-bottom: 30px;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New Study Application!</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Learning Outcomes Study</p>
  </div>
  
  <p style="font-size: 16px;">A new student has applied to join the Learning Outcomes Study.</p>
  
  <div style="background: #f0fdf4; border: 2px solid #059669; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h3 style="color: #166534; margin: 0 0 15px 0;">📋 Application Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #dcfce7;"><td style="padding: 12px 0; color: #666; width: 40%;">Full Name:</td><td style="padding: 12px 0; font-weight: 600;">${body.firstName} ${body.lastName}</td></tr>
      <tr style="border-bottom: 1px solid #dcfce7;"><td style="padding: 12px 0; color: #666;">Email:</td><td style="padding: 12px 0;"><a href="mailto:${body.email}" style="color: #059669;">${body.email}</a></td></tr>
      <tr style="border-bottom: 1px solid #dcfce7;"><td style="padding: 12px 0; color: #666;">Grade Level:</td><td style="padding: 12px 0;">${body.gradeLevel}</td></tr>
      <tr style="border-bottom: 1px solid #dcfce7;"><td style="padding: 12px 0; color: #666;">School:</td><td style="padding: 12px 0;">${body.currentSchool}</td></tr>
      <tr style="border-bottom: 1px solid #dcfce7;"><td style="padding: 12px 0; color: #666;">Standardized Tests:</td><td style="padding: 12px 0;">${body.standardizedTests}</td></tr>
      <tr style="border-bottom: 1px solid #dcfce7;"><td style="padding: 12px 0; color: #666;">Hours/Day Commitment:</td><td style="padding: 12px 0; font-weight: 600; color: #059669;">${body.hoursPerDay}</td></tr>
      ${body.parentEmail ? `<tr style="border-bottom: 1px solid #dcfce7;"><td style="padding: 12px 0; color: #666;">Parent Email:</td><td style="padding: 12px 0;"><a href="mailto:${body.parentEmail}" style="color: #059669;">${body.parentEmail}</a></td></tr>` : ''}
      ${body.additionalInfo ? `<tr><td style="padding: 12px 0; color: #666; vertical-align: top;">Additional Info:</td><td style="padding: 12px 0;">${body.additionalInfo}</td></tr>` : ''}
    </table>
  </div>
  
  <div style="background: #eff6ff; border: 1px solid #93c5fd; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <h3 style="color: #1e40af; margin: 0 0 10px 0;">📊 Technical Details</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr><td style="padding: 6px 0; color: #666;">User ID:</td><td style="padding: 6px 0; font-family: monospace;">${userId}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Application ID:</td><td style="padding: 6px 0; font-family: monospace;">${docRef.id}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Applied At:</td><td style="padding: 6px 0;">${new Date().toLocaleString()}</td></tr>
    </table>
  </div>
  
  <div style="text-align: center; margin-top: 30px;">
    <a href="mailto:${body.email}?subject=Learning Outcomes Study - Application Approved!" style="display: inline-block; background: #059669; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reply to Applicant</a>
  </div>
  
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
    <p>Ludwitt Admin Notification</p>
  </div>
</body>
</html>
`

    const adminEmailText = `
NEW LEARNING OUTCOMES STUDY APPLICATION

A new student has applied to join the Learning Outcomes Study.

APPLICATION DETAILS:
- Full Name: ${body.firstName} ${body.lastName}
- Email: ${body.email}
- Grade Level: ${body.gradeLevel}
- School: ${body.currentSchool}
- Standardized Tests: ${body.standardizedTests}
- Hours/Day Commitment: ${body.hoursPerDay}
${body.parentEmail ? `- Parent Email: ${body.parentEmail}` : ''}
${body.additionalInfo ? `- Additional Info: ${body.additionalInfo}` : ''}

TECHNICAL DETAILS:
- User ID: ${userId}
- Application ID: ${docRef.id}
- Applied At: ${new Date().toLocaleString()}
`

    // Send email to admin
    await sendCustomEmail({
      to: process.env.LEARNING_STUDY_CONTACT_EMAIL || 'support@ludwitt.com',
      subject: `🎉 New Study Application: ${body.firstName} ${body.lastName}`,
      html: adminEmailHtml,
      text: adminEmailText,
      replyTo: body.email
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: docRef.id
    })

  } catch (error) {
    apiLogger.apiError('learning-study/apply', 'Error submitting application', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}


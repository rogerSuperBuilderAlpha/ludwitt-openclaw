// Email templates

interface EmailTemplate {
  subject: string
  html: string
  text: string
}

/**
 * Base email layout
 */
function createEmailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
    }
    .content {
      background: white;
      padding: 30px 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #7c3aed;
      color: white !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 14px;
    }
    .footer a {
      color: #7c3aed;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Ludwitt</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}">Ludwitt</a> - Learn, Build, Rise<br>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'}/settings">Manage Preferences</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}

/**
 * Welcome email
 */
export function welcomeEmail(data: {
  name: string
  dashboardUrl: string
}): EmailTemplate {
  const html = createEmailLayout(`
    <h2>Welcome to Ludwitt! 🎉</h2>
    <p>Hi ${data.name},</p>
    <p>
      Welcome to Ludwitt! We're excited to have you join our community of developers
      who are learning, building, and rising together.
    </p>
    <p>
      Here's what you can do next:
    </p>
    <ul>
      <li>Set up your developer profile</li>
      <li>Join a cohort to connect with other learners</li>
      <li>Start tracking your projects and progress</li>
      <li>Explore learning resources and mentorship opportunities</li>
    </ul>
    <p>
      <a href="${data.dashboardUrl}" class="button">Go to Dashboard</a>
    </p>
    <p>
      If you have any questions, just reply to this email. We're here to help!
    </p>
    <p>
      Happy coding!<br>
      <strong>The Ludwitt Team</strong>
    </p>
  `)

  const text = `
Welcome to Ludwitt! 🎉

Hi ${data.name},

Welcome to Ludwitt! We're excited to have you join our community of developers who are learning, building, and rising together.

Here's what you can do next:
- Set up your developer profile
- Join a cohort to connect with other learners
- Start tracking your projects and progress
- Explore learning resources and mentorship opportunities

Go to Dashboard: ${data.dashboardUrl}

If you have any questions, just reply to this email. We're here to help!

Happy coding!
The Ludwitt Team
`

  return {
    subject: 'Welcome to Ludwitt! 🎉',
    html,
    text,
  }
}

/**
 * Achievement unlocked email
 */
export function achievementEmail(data: {
  name: string
  achievementTitle: string
  achievementDescription: string
  achievementEmoji: string
  points: number
  totalPoints: number
  achievementsUrl: string
}): EmailTemplate {
  const html = createEmailLayout(`
    <h2>${data.achievementEmoji} Achievement Unlocked!</h2>
    <p>Hi ${data.name},</p>
    <p>
      Congratulations! You've unlocked a new achievement:
    </p>
    <div style="background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%); padding: 20px; border-radius: 8px; text-align: center; color: white; margin: 20px 0;">
      <div style="font-size: 48px; margin-bottom: 10px;">${data.achievementEmoji}</div>
      <h3 style="margin: 0 0 10px 0; color: white;">${data.achievementTitle}</h3>
      <p style="margin: 0; color: rgba(255,255,255,0.9);">${data.achievementDescription}</p>
      <p style="margin: 20px 0 0 0; font-size: 20px; font-weight: bold;">+${data.points} points</p>
    </div>
    <p>
      You now have <strong>${data.totalPoints} total points</strong>. Keep going!
    </p>
    <p>
      <a href="${data.achievementsUrl}" class="button">View All Achievements</a>
    </p>
    <p>
      Great work!<br>
      <strong>The Ludwitt Team</strong>
    </p>
  `)

  const text = `
${data.achievementEmoji} Achievement Unlocked!

Hi ${data.name},

Congratulations! You've unlocked a new achievement:

${data.achievementTitle}
${data.achievementDescription}

+${data.points} points

You now have ${data.totalPoints} total points. Keep going!

View All Achievements: ${data.achievementsUrl}

Great work!
The Ludwitt Team
`

  return {
    subject: `${data.achievementEmoji} Achievement Unlocked: ${data.achievementTitle}`,
    html,
    text,
  }
}

/**
 * Weekly digest email
 */
export function weeklyDigestEmail(data: {
  name: string
  stats: {
    projectsCompleted: number
    achievementsUnlocked: number
    pointsEarned: number
    timeSpent: number
  }
  leaderboardRank?: number
  upcomingSessions: Array<{
    title: string
    date: string
    url: string
  }>
  dashboardUrl: string
}): EmailTemplate {
  const html = createEmailLayout(`
    <h2>Your Weekly Progress 📊</h2>
    <p>Hi ${data.name},</p>
    <p>
      Here's a summary of your activity on Ludwitt this week:
    </p>
    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 15px; background: #f9fafb; border-radius: 8px; margin-bottom: 10px;">
          <div style="font-size: 32px; font-weight: bold; color: #7c3aed;">${data.stats.projectsCompleted}</div>
          <div style="color: #6b7280;">Projects Completed</div>
        </td>
        <td style="padding: 15px; background: #f9fafb; border-radius: 8px; margin-bottom: 10px;">
          <div style="font-size: 32px; font-weight: bold; color: #7c3aed;">${data.stats.achievementsUnlocked}</div>
          <div style="color: #6b7280;">Achievements</div>
        </td>
      </tr>
      <tr>
        <td style="padding: 15px; background: #f9fafb; border-radius: 8px;">
          <div style="font-size: 32px; font-weight: bold; color: #7c3aed;">+${data.stats.pointsEarned}</div>
          <div style="color: #6b7280;">Points Earned</div>
        </td>
        <td style="padding: 15px; background: #f9fafb; border-radius: 8px;">
          <div style="font-size: 32px; font-weight: bold; color: #7c3aed;">${data.stats.timeSpent}h</div>
          <div style="color: #6b7280;">Time Spent</div>
        </td>
      </tr>
    </table>
    ${
      data.leaderboardRank
        ? `<p>🏆 You're currently <strong>#${data.leaderboardRank}</strong> on the leaderboard!</p>`
        : ''
    }
    ${
      data.upcomingSessions.length > 0
        ? `
      <h3>Upcoming Sessions</h3>
      <ul>
        ${data.upcomingSessions
          .map(
            (session) => `
          <li>
            <strong>${session.title}</strong><br>
            ${session.date}<br>
            <a href="${session.url}">Join Session</a>
          </li>
        `
          )
          .join('')}
      </ul>
    `
        : ''
    }
    <p>
      <a href="${data.dashboardUrl}" class="button">View Dashboard</a>
    </p>
    <p>
      Keep up the great work!<br>
      <strong>The Ludwitt Team</strong>
    </p>
  `)

  const text = `
Your Weekly Progress 📊

Hi ${data.name},

Here's a summary of your activity on Ludwitt this week:

${data.stats.projectsCompleted} Projects Completed
${data.stats.achievementsUnlocked} Achievements Unlocked
+${data.stats.pointsEarned} Points Earned
${data.stats.timeSpent}h Time Spent

${data.leaderboardRank ? `🏆 You're currently #${data.leaderboardRank} on the leaderboard!` : ''}

${
  data.upcomingSessions.length > 0
    ? `
Upcoming Sessions:
${data.upcomingSessions.map((s) => `- ${s.title} (${s.date}): ${s.url}`).join('\n')}
`
    : ''
}

View Dashboard: ${data.dashboardUrl}

Keep up the great work!
The Ludwitt Team
`

  return {
    subject: 'Your Weekly Progress on Ludwitt 📊',
    html,
    text,
  }
}

/**
 * Mentor session reminder
 */
export function sessionReminderEmail(data: {
  name: string
  sessionTitle: string
  sessionDate: string
  sessionUrl: string
  mentorName: string
}): EmailTemplate {
  const html = createEmailLayout(`
    <h2>Session Reminder 🔔</h2>
    <p>Hi ${data.name},</p>
    <p>
      This is a reminder about your upcoming session:
    </p>
    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #7c3aed; margin: 20px 0;">
      <h3 style="margin: 0 0 10px 0;">${data.sessionTitle}</h3>
      <p style="margin: 5px 0; color: #6b7280;">
        <strong>Date:</strong> ${data.sessionDate}<br>
        <strong>With:</strong> ${data.mentorName}
      </p>
    </div>
    <p>
      <a href="${data.sessionUrl}" class="button">Join Session</a>
    </p>
    <p>
      See you there!<br>
      <strong>The Ludwitt Team</strong>
    </p>
  `)

  const text = `
Session Reminder 🔔

Hi ${data.name},

This is a reminder about your upcoming session:

${data.sessionTitle}
Date: ${data.sessionDate}
With: ${data.mentorName}

Join Session: ${data.sessionUrl}

See you there!
The Ludwitt Team
`

  return {
    subject: `Reminder: ${data.sessionTitle} with ${data.mentorName}`,
    html,
    text,
  }
}

/**
 * Educator invitation email
 */
export function educatorInvitationEmail(data: {
  studentEmail: string
  educatorName: string
  educatorEmail: string
  groupName?: string
  signupUrl: string
}): EmailTemplate {
  const html = createEmailLayout(`
    <h2>Your Teacher Invited You to Join Ludwitt! 🎓</h2>
    <p>Hi there,</p>
    <p>
      <strong>${data.educatorName}</strong> (${data.educatorEmail}) has invited you to join Ludwitt${data.groupName ? ` as part of <strong>${data.groupName}</strong>` : ''}.
    </p>
    <p>
      Ludwitt is a learning platform where you can:
    </p>
    <ul>
      <li>📚 Practice math and reading skills with personalized exercises</li>
      <li>🚀 Learn to code and build real projects</li>
      <li>📊 Track your progress and see your growth</li>
      <li>🏆 Earn achievements and compete on leaderboards</li>
    </ul>
    <p>
      Your teacher will be able to see your progress and help guide your learning journey.
    </p>
    <p>
      <a href="${data.signupUrl}" class="button">Join Ludwitt Now</a>
    </p>
    <p>
      If you have any questions, feel free to reach out to your teacher or reply to this email.
    </p>
    <p>
      Welcome aboard!<br>
      <strong>The Ludwitt Team</strong>
    </p>
  `)

  const text = `
Your Teacher Invited You to Join Ludwitt! 🎓

Hi there,

${data.educatorName} (${data.educatorEmail}) has invited you to join Ludwitt${data.groupName ? ` as part of ${data.groupName}` : ''}.

Ludwitt is a learning platform where you can:
- Practice math and reading skills with personalized exercises
- Learn to code and build real projects
- Track your progress and see your growth
- Earn achievements and compete on leaderboards

Your teacher will be able to see your progress and help guide your learning journey.

Join Ludwitt Now: ${data.signupUrl}

If you have any questions, feel free to reach out to your teacher or reply to this email.

Welcome aboard!
The Ludwitt Team
`

  return {
    subject: `${data.educatorName} Invited You to Join Ludwitt`,
    html,
    text,
  }
}

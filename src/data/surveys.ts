import { Survey, SURVEY_IDS } from '@/lib/types/survey'

export const postGitHubSurvey: Survey = {
  id: SURVEY_IDS.POST_GITHUB,
  title: 'Welcome! Quick Survey',
  description: 'Help us understand your background before we get started.',
  questions: [
    {
      id: 'programming-experience',
      question: 'How would you rate your programming experience?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Complete beginner - Never coded before',
        'Beginner - Some basic knowledge',
        'Intermediate - Built a few projects',
        'Advanced - Professional experience',
      ],
    },
    {
      id: 'heard-about',
      question: 'How did you hear about Ludwitt?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Social media',
        'Friend or colleague',
        'Search engine',
        'Online community/forum',
        'Other',
      ],
    },
    {
      id: 'goals',
      question: 'What are you hoping to achieve with Ludwitt?',
      type: 'text',
      required: false,
    },
  ],
}

export const postCursorSurvey: Survey = {
  id: SURVEY_IDS.POST_CURSOR,
  title: 'Cursor Setup Complete!',
  description: 'Let us know how the setup process went.',
  questions: [
    {
      id: 'setup-difficulty',
      question: 'How would you rate the difficulty of setting up Cursor?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'cursor-familiar',
      question: 'Had you used Cursor or other AI coding tools before?',
      type: 'yes-no',
      required: true,
    },
    {
      id: 'setup-feedback',
      question: 'Any feedback on the setup process? What could be improved?',
      type: 'text',
      required: false,
    },
    {
      id: 'excited-about',
      question: 'What are you most excited to build with AI assistance?',
      type: 'text',
      required: false,
    },
  ],
}

export const postWebsiteSurvey: Survey = {
  id: SURVEY_IDS.POST_WEBSITE,
  title: 'Personal Website Complete!',
  description: "Congratulations on building your website! We'd love your feedback.",
  questions: [
    {
      id: 'project-difficulty',
      question: 'How challenging did you find building your personal website?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'ai-helpfulness',
      question: 'How helpful was the AI assistance in building your project?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'got-stuck',
      question: 'Did you get stuck at any point during the project?',
      type: 'yes-no',
      required: true,
    },
    {
      id: 'stuck-details',
      question: 'If yes, what did you get stuck on?',
      type: 'text',
      required: false,
    },
    {
      id: 'most-valuable',
      question: 'What was the most valuable thing you learned?',
      type: 'text',
      required: false,
    },
    {
      id: 'improvements',
      question: 'How could we improve the project guide?',
      type: 'text',
      required: false,
    },
  ],
}

export const postVercelSurvey: Survey = {
  id: SURVEY_IDS.POST_VERCEL,
  title: 'Congratulations! 🎉',
  description: 'You completed the entire learning journey! Please share your experience.',
  questions: [
    {
      id: 'deployment-difficulty',
      question: 'How easy was it to deploy your site to Vercel?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'overall-experience',
      question: 'How would you rate your overall experience with Ludwitt?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'confidence-level',
      question: 'Do you feel more confident building web applications now?',
      type: 'yes-no',
      required: true,
    },
    {
      id: 'recommend',
      question: 'How likely are you to recommend Ludwitt to a friend? (1 = Not likely, 5 = Very likely)',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'next-steps',
      question: 'What would you like to learn or build next?',
      type: 'text',
      required: false,
    },
    {
      id: 'best-part',
      question: 'What was the best part of your Ludwitt experience?',
      type: 'text',
      required: false,
    },
    {
      id: 'suggestions',
      question: 'Any suggestions for how we can improve?',
      type: 'text',
      required: false,
    },
    {
      id: 'testimonial',
      question: 'Would you like to share a brief testimonial we could use (optional)?',
      type: 'text',
      required: false,
    },
  ],
}

export const preCustomProjectSurvey: Survey = {
  id: SURVEY_IDS.PRE_CUSTOM_PROJECT,
  title: 'Help Us Tailor Your Project',
  description: 'A few quick questions to generate the perfect project for your goals.',
  questions: [
    {
      id: 'current-skill-level',
      question: 'How would you rate your current web development skills after completing Ludwitt?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Still learning the basics',
        'Comfortable with fundamentals',
        'Ready for intermediate challenges',
        'Want something advanced',
      ],
    },
    {
      id: 'time-commitment',
      question: 'How much time can you dedicate to this project per week?',
      type: 'multiple-choice',
      required: true,
      options: [
        '2-5 hours per week',
        '5-10 hours per week',
        '10-20 hours per week',
        '20+ hours per week (full-time)',
      ],
    },
    {
      id: 'learning-preference',
      question: 'What type of project excites you most?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Building tools that solve real problems',
        'Creating beautiful user interfaces',
        'Working with data and APIs',
        'Mobile or cross-platform apps',
        'AI/ML integrations',
        'E-commerce or business apps',
      ],
    },
    {
      id: 'technologies-interested',
      question: 'Any specific technologies you want to learn? (e.g., databases, authentication, APIs)',
      type: 'text',
      required: false,
    },
    {
      id: 'project-size',
      question: 'Preferred project size?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Quick win (1-2 weeks)',
        'Medium project (2-4 weeks)',
        'Large project (1-2 months)',
        'Long-term passion project (2+ months)',
      ],
    },
  ],
}

export const ttAcademicLifeSurvey: Survey = {
  id: SURVEY_IDS.TT_ACADEMIC_LIFE,
  title: 'Welcome Trinidad & Tobago Students! 🇹🇹',
  description: 'Help us understand your academic journey and personalize your learning experience.',
  questions: [
    {
      id: 'institution',
      question: 'Which institution do you attend?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Primary School',
        'Secondary School',
        'University of the West Indies (UWI)',
        'University of Trinidad and Tobago (UTT)',
        'College of Science, Technology and Applied Arts of Trinidad and Tobago (COSTAATT)',
        'University of the Southern Caribbean (USC)',
        'Other',
      ],
    },
    {
      id: 'year-of-study',
      question: 'What year of study are you in?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Standard 1-3',
        'Standard 4-5',
        'Form 4',
        'Form 5',
        'Form 6 (Lower)',
        'Form 6 (Upper)',
        'Year 1 (University)',
        'Year 2 (University)',
        'Year 3 (University)',
        'Year 4+ (University)',
        'Graduate Student',
      ],
    },
    {
      id: 'field-of-study',
      question: 'What is your favourite or best/worst subject?',
      type: 'text',
      required: true,
    },
    {
      id: 'programming-experience',
      question: 'How would you rate your programming experience?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Complete beginner - Never coded before',
        'Beginner - Some basic knowledge',
        'Intermediate - Built a few projects',
        'Advanced - Professional experience',
      ],
    },
    {
      id: 'learning-goals',
      question: 'What are your main learning goals?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Improve my Grades in Math and English',
        'Improve my grades in computer science/IT courses',
        'Build projects for my portfolio',
        'Prepare for internships or job applications',
        'Learn skills for personal projects',
        'Supplement my formal education',
        'Career change or upskilling',
      ],
    },
    {
      id: 'study-time',
      question: 'How much time can you dedicate to learning per week?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Less than 2 hours',
        '2-5 hours',
        '5-10 hours',
        '10-15 hours',
        'More than 15 hours',
      ],
    },
    {
      id: 'challenges',
      question: 'What are your biggest academic challenges?',
      type: 'text',
      required: false,
    },
    {
      id: 'career-interests',
      question: 'What career path interests you most?',
      type: 'multiple-choice',
      required: false,
      options: [
        'Software Development/Engineering',
        'Data Science/Analytics',
        'Cybersecurity',
        'Web Development',
        'Mobile App Development',
        'IT Support/Systems Administration',
        'UI/UX Design',
        'Teaching/Education',
        'Entrepreneurship/Startups',
        'Not sure yet',
      ],
    },
    {
      id: 'additional-notes',
      question: 'Anything else you\'d like us to know about your learning journey?',
      type: 'text',
      required: false,
    },
  ],
}

// ============================================
// Claude Code Path Surveys
// ============================================

export const postClaudeCodeSurvey: Survey = {
  id: SURVEY_IDS.POST_CLAUDE_CODE,
  title: 'Claude Code Setup Complete!',
  description: 'Let us know how setting up Claude Code went.',
  questions: [
    {
      id: 'setup-difficulty',
      question: 'How would you rate the difficulty of setting up Claude Code?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'cli-familiar',
      question: 'Had you used command-line AI tools before?',
      type: 'yes-no',
      required: true,
    },
    {
      id: 'cli-vs-editor',
      question: 'How do you feel about using a CLI tool vs a code editor?',
      type: 'multiple-choice',
      required: true,
      options: [
        'I prefer the CLI - it feels more powerful',
        'I\'m getting used to it - it\'s different but interesting',
        'I find it challenging but I\'m learning',
        'I\'d prefer a visual editor, but I want to learn this too',
      ],
    },
    {
      id: 'setup-feedback',
      question: 'Any feedback on the Claude Code setup process?',
      type: 'text',
      required: false,
    },
  ],
}

export const postTweetFunctionSurvey: Survey = {
  id: SURVEY_IDS.POST_TWEET_FUNCTION,
  title: 'Tweet Function Built!',
  description: 'You just built an automated tweet agent! Share your experience.',
  questions: [
    {
      id: 'project-difficulty',
      question: 'How challenging was building the tweet function?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'ai-helpfulness',
      question: 'How helpful was Claude Code in building the function?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'got-stuck',
      question: 'Did you get stuck at any point during the project?',
      type: 'yes-no',
      required: true,
    },
    {
      id: 'stuck-details',
      question: 'If yes, what did you get stuck on?',
      type: 'text',
      required: false,
    },
    {
      id: 'most-valuable',
      question: 'What was the most valuable thing you learned?',
      type: 'text',
      required: false,
    },
  ],
}

// ============================================
// OpenClaw Path Surveys
// ============================================

export const postOpenclawSurvey: Survey = {
  id: SURVEY_IDS.POST_OPENCLAW,
  title: 'OpenClaw Setup Complete!',
  description: 'Tell us about your experience setting up OpenClaw.',
  questions: [
    {
      id: 'setup-difficulty',
      question: 'How would you rate the difficulty of setting up OpenClaw?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'security-comfort',
      question: 'How comfortable do you feel about the security configuration?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'agent-concept',
      question: 'How well do you understand the concept of an AI agent platform?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Very well - I get how agents work and why security matters',
        'Mostly - I understand the basics but some parts are fuzzy',
        'Somewhat - I followed the steps but want to learn more',
        'Not yet - I\'m still figuring out what this does',
      ],
    },
    {
      id: 'setup-feedback',
      question: 'Any feedback on the OpenClaw setup process?',
      type: 'text',
      required: false,
    },
  ],
}

export const postOpenclawWebsiteSurvey: Survey = {
  id: SURVEY_IDS.POST_OPENCLAW_WEBSITE,
  title: 'OpenClaw Built Your Website!',
  description: 'Your AI agent just built a website and set up email. How was it?',
  questions: [
    {
      id: 'project-difficulty',
      question: 'How challenging was directing OpenClaw to build the website?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'agent-quality',
      question: 'How would you rate the quality of what the agent built?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'email-setup',
      question: 'Did the email integration work correctly?',
      type: 'yes-no',
      required: true,
    },
    {
      id: 'agent-autonomy',
      question: 'What surprised you most about working with an AI agent?',
      type: 'text',
      required: false,
    },
    {
      id: 'improvements',
      question: 'How could we improve this guide?',
      type: 'text',
      required: false,
    },
  ],
}

// ============================================
// Open Source PR Survey
// ============================================

export const postOpensourcePrSurvey: Survey = {
  id: SURVEY_IDS.POST_OPENSOURCE_PR,
  title: 'Open Source PR Complete!',
  description: 'Tell us about your first open-source contribution experience.',
  questions: [
    {
      id: 'pr-difficulty',
      question: 'How challenging was the pull request process?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'pr-merged',
      question: 'Was your PR merged (or is it pending review)?',
      type: 'multiple-choice',
      required: true,
      options: [
        'Yes, it was merged!',
        'Still pending review',
        'Changes were requested - working on it',
        'I haven\'t submitted it yet',
      ],
    },
    {
      id: 'git-confidence',
      question: 'How confident do you feel with Git and GitHub after this exercise?',
      type: 'rating',
      required: true,
      maxRating: 5,
    },
    {
      id: 'pr-feedback',
      question: 'Any feedback on this open-source contribution exercise?',
      type: 'text',
      required: false,
    },
  ],
}

// Export all surveys in a map for easy access
export const surveys: Record<string, Survey> = {
  [SURVEY_IDS.POST_GITHUB]: postGitHubSurvey,
  [SURVEY_IDS.POST_CURSOR]: postCursorSurvey,
  [SURVEY_IDS.POST_WEBSITE]: postWebsiteSurvey,
  [SURVEY_IDS.POST_VERCEL]: postVercelSurvey,
  [SURVEY_IDS.PRE_CUSTOM_PROJECT]: preCustomProjectSurvey,
  [SURVEY_IDS.TT_ACADEMIC_LIFE]: ttAcademicLifeSurvey,
  [SURVEY_IDS.POST_CLAUDE_CODE]: postClaudeCodeSurvey,
  [SURVEY_IDS.POST_TWEET_FUNCTION]: postTweetFunctionSurvey,
  [SURVEY_IDS.POST_OPENCLAW]: postOpenclawSurvey,
  [SURVEY_IDS.POST_OPENCLAW_WEBSITE]: postOpenclawWebsiteSurvey,
  [SURVEY_IDS.POST_OPENSOURCE_PR]: postOpensourcePrSurvey,
}

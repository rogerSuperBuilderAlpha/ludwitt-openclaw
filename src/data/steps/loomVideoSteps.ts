export interface Step {
  id: string
  text: string
  link?: { url: string; text: string }
  color: string
  details: string
}

export const loomVideoSteps: Step[] = [
  {
    id: 'step1',
    text: 'Visit ',
    link: { url: 'https://www.loom.com', text: 'loom.com' },
    color: 'blue',
    details: 'Loom is the industry-standard tool for creating professional screen recordings. As a developer, you\'ll use video to showcase your work to clients, explain technical concepts, and build your personal brand. This skill is just as important as coding itself - clients want to SEE what you\'ve built!'
  },
  {
    id: 'step2',
    text: 'Click "Get Loom for Free" and sign up',
    color: 'blue',
    details: 'Create your Loom account by clicking "Get Loom for Free" and signing up with Google or email. The free plan is perfect for getting started and includes unlimited videos. This account will become your portfolio of video demonstrations.'
  },
  {
    id: 'step3',
    text: 'Install the Loom browser extension or desktop app',
    color: 'green',
    details: 'After signing up, Loom will prompt you to install either the Chrome extension or desktop app. Choose whichever you prefer - both work great! The extension is faster to access, while the desktop app offers more features. You can always install both later.'
  },
  {
    id: 'step4',
    text: 'Record a 2-3 minute video showcasing your deployed portfolio',
    color: 'purple',
    details: 'Here\'s where the magic happens! Click the Loom icon to start recording. Choose "Screen + Camera" so viewers can see both your portfolio AND you explaining it. Walk through your live portfolio site, highlight features you built, explain your design choices, and share what you learned. Be enthusiastic - this is YOUR creation! Remember: clients and employers want to see your personality and communication skills, not just code. This video is both a learning exercise AND a powerful testimonial for us!'
  },
  {
    id: 'step5',
    text: 'Copy the Loom URL and paste it below to complete your journey',
    color: 'green',
    details: 'After recording, Loom automatically uploads and generates a shareable link. Click "Copy Link" and paste it in the submission box below. This video proves you can not only BUILD amazing things, but also PRESENT them professionally. Congratulations - you\'ve completed the full Ludwitt journey from zero to deployed portfolio to professional showcase!'
  },
]

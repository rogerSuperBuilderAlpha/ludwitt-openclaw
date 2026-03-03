/**
 * Time Word Problems V2 - Grade 3-7
 * 
 * Topics covered:
 * - Elapsed Time (grades 3-4)
 * - Scheduling (grades 4-5)
 * - Time Zones (grades 5-6)
 * - Speed and Distance (grades 6-7)
 * - Work Rate Problems (grade 7)
 */
import type { MathProblemV2 } from '@/lib/types/math-v2'

const now = new Date().toISOString()

export const TIME_WORD_PROBLEMS_V2: MathProblemV2[] = [
  // ============================================================================
  // ELAPSED TIME (5 problems) - Grades 3-4
  // ============================================================================
  {
    id: 'word-v2-g3-time-026',
    version: 2,
    type: 'word-problem',
    difficulty: 3.0,
    gradeLevel: 3,
    question: {
      text: 'Lunch starts at 11:30 AM and ends at 12:15 PM. How long is lunch?'
    },
    answer: {
      type: 'numeric',
      correct: '45',
      acceptable: ['45', '45 minutes', '45 min', '45mins'],
      unit: 'minutes'
    },
    solution: {
      steps: [
        { number: 1, description: 'Count from 11:30 to 12:00', latex: '30 \\text{ minutes}' },
        { number: 2, description: 'Count from 12:00 to 12:15', latex: '15 \\text{ minutes}' },
        { number: 3, description: 'Add the parts', latex: '30 + 15 = 45 \\text{ minutes}' }
      ],
      method: 'Break into parts and add'
    },
    hints: [
      { level: 'gentle', text: 'Count how many minutes from 11:30 to 12:00, then add the minutes after 12:00.' },
      { level: 'moderate', text: 'From 11:30 to 12:00 is 30 minutes. From 12:00 to 12:15 is 15 more minutes.' },
      { level: 'explicit', text: '30 + 15 = 45 minutes total' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Elapsed Time',
      skills: ['elapsed_time', 'addition', 'telling_time'],
      prerequisites: ['telling_time', 'addition'],
      concepts: ['elapsed-time', 'duration', 'time'],
      commonMistakes: ['Counting hours instead of minutes', 'Errors crossing the hour'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'elapsed-time', 'grade-3'] }
  },
  {
    id: 'word-v2-g3-time-027',
    version: 2,
    type: 'word-problem',
    difficulty: 3.0,
    gradeLevel: 3,
    question: {
      text: 'Mia started her homework at 4:00 PM. She worked for 25 minutes. What time did she finish?'
    },
    answer: {
      type: 'exact',
      correct: '4:25 PM',
      acceptable: ['4:25 PM', '4:25 pm', '4:25', '16:25']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 25 minutes to 4:00', latex: '4:00 + 25 \\text{ min} = 4:25' }
      ],
      method: 'Add minutes to start time'
    },
    hints: [
      { level: 'gentle', text: 'Start at 4:00 and add 25 minutes.' },
      { level: 'moderate', text: 'Since 25 is less than 60, just add it to the minutes: 4:00 becomes 4:25.' },
      { level: 'explicit', text: '4:00 PM + 25 minutes = 4:25 PM' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Elapsed Time',
      skills: ['elapsed_time', 'addition', 'telling_time'],
      prerequisites: ['telling_time', 'addition'],
      concepts: ['elapsed-time', 'end-time', 'time'],
      commonMistakes: ['Writing 4:25 AM instead of PM', 'Adding to hours instead of minutes'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 45
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'elapsed-time', 'grade-3'] }
  },
  {
    id: 'word-v2-g3-time-028',
    version: 2,
    type: 'word-problem',
    difficulty: 3.5,
    gradeLevel: 3,
    question: {
      text: 'A soccer practice starts at 3:30 PM and lasts 1 hour and 15 minutes. What time does practice end?'
    },
    answer: {
      type: 'exact',
      correct: '4:45 PM',
      acceptable: ['4:45 PM', '4:45 pm', '4:45', '16:45']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 1 hour to start time', latex: '3:30 + 1 \\text{ hour} = 4:30' },
        { number: 2, description: 'Add 15 minutes', latex: '4:30 + 15 \\text{ min} = 4:45' }
      ],
      method: 'Add hours then minutes'
    },
    hints: [
      { level: 'gentle', text: 'First add the hour, then add the extra minutes.' },
      { level: 'moderate', text: '3:30 + 1 hour = 4:30. Now add 15 more minutes.' },
      { level: 'explicit', text: '4:30 + 15 minutes = 4:45 PM' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Elapsed Time',
      skills: ['elapsed_time', 'time_addition'],
      prerequisites: ['telling_time', 'addition'],
      concepts: ['elapsed-time', 'hours-and-minutes', 'time'],
      commonMistakes: ['Adding hours and minutes incorrectly', 'Forgetting to carry over'],
      scaffoldingLevel: 'extensive',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'elapsed-time', 'grade-3'] }
  },
  {
    id: 'word-v2-g4-time-029',
    version: 2,
    type: 'word-problem',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'A movie starts at 2:45 PM and is 1 hour and 52 minutes long. What time does the movie end?'
    },
    answer: {
      type: 'exact',
      correct: '4:37 PM',
      acceptable: ['4:37 PM', '4:37 pm', '4:37', '16:37']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add the hours', latex: '2:45 + 1 \\text{ hour} = 3:45' },
        { number: 2, description: 'Add the minutes', latex: '3:45 + 52 \\text{ minutes}' },
        { number: 3, description: 'Since 45 + 52 = 97 minutes, convert', latex: '97 \\text{ min} = 1 \\text{ hour } 37 \\text{ min}' },
        { number: 4, description: 'Add the extra hour', latex: '3:00 + 1:37 = 4:37 \\text{ PM}' }
      ],
      method: 'Adding time with regrouping'
    },
    hints: [
      { level: 'gentle', text: 'Add the hours first, then add the minutes. Remember that 60 minutes = 1 hour.' },
      { level: 'moderate', text: 'After adding 1 hour: 3:45 PM. Now add 52 minutes to 45 minutes. What happens when you go over 60?' },
      { level: 'explicit', text: '45 + 52 = 97 minutes = 1 hour 37 minutes. So 3:45 + 1:52 = 4:37 PM' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Elapsed Time',
      skills: ['elapsed_time', 'time_addition', 'regrouping'],
      prerequisites: ['telling_time', 'addition'],
      concepts: ['elapsed-time', 'time', 'regrouping'],
      commonMistakes: ['Not regrouping when minutes exceed 60', 'Incorrectly converting AM/PM'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'elapsed-time', 'grade-4'] }
  },
  {
    id: 'word-v2-g4-time-030',
    version: 2,
    type: 'word-problem',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'Leo left home at 7:50 AM and arrived at school at 8:25 AM. How many minutes was his trip to school?'
    },
    answer: {
      type: 'numeric',
      correct: '35',
      acceptable: ['35', '35 minutes', '35 min'],
      unit: 'minutes'
    },
    solution: {
      steps: [
        { number: 1, description: 'Count from 7:50 to 8:00', latex: '10 \\text{ minutes}' },
        { number: 2, description: 'Count from 8:00 to 8:25', latex: '25 \\text{ minutes}' },
        { number: 3, description: 'Add', latex: '10 + 25 = 35 \\text{ minutes}' }
      ],
      method: 'Count to the hour, then past'
    },
    hints: [
      { level: 'gentle', text: 'Break it into two parts: 7:50 to 8:00, then 8:00 to 8:25.' },
      { level: 'moderate', text: '7:50 to 8:00 is 10 minutes. 8:00 to 8:25 is 25 minutes. Add them.' },
      { level: 'explicit', text: '10 + 25 = 35 minutes' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Elapsed Time',
      skills: ['elapsed_time', 'subtraction', 'addition'],
      prerequisites: ['telling_time', 'subtraction'],
      concepts: ['elapsed-time', 'duration', 'time'],
      commonMistakes: ['Subtracting minutes directly (25 - 50)', 'Not handling hour change'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'elapsed-time', 'grade-4'] }
  },

  // ============================================================================
  // SCHEDULING (5 problems) - Grades 4-5
  // ============================================================================
  {
    id: 'word-v2-g4-time-031',
    version: 2,
    type: 'word-problem',
    difficulty: 4.0,
    gradeLevel: 4,
    question: {
      text: 'Emma has piano lessons every Tuesday. Each lesson is 45 minutes. If she starts at 5:15 PM, what time will her lesson end?'
    },
    answer: {
      type: 'exact',
      correct: '6:00 PM',
      acceptable: ['6:00 PM', '6:00 pm', '6:00', '18:00', '6 PM']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 45 minutes to 5:15', latex: '5:15 + 45 \\text{ min}' },
        { number: 2, description: 'Calculate', latex: '15 + 45 = 60 \\text{ min} = 1 \\text{ hour}' },
        { number: 3, description: 'Result', latex: '5:15 + 0:45 = 6:00 \\text{ PM}' }
      ],
      method: 'Add minutes with regrouping to hours'
    },
    hints: [
      { level: 'gentle', text: 'Add 45 minutes to 5:15. Watch what happens when minutes go over 60.' },
      { level: 'moderate', text: '15 + 45 = 60 minutes = 1 full hour. So it becomes 6:00.' },
      { level: 'explicit', text: '5:15 PM + 45 minutes = 6:00 PM' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Scheduling',
      skills: ['time_addition', 'regrouping'],
      prerequisites: ['telling_time', 'addition'],
      concepts: ['scheduling', 'elapsed-time', 'time'],
      commonMistakes: ['Writing 5:60 instead of 6:00', 'Forgetting to regroup'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'scheduling', 'grade-4'] }
  },
  {
    id: 'word-v2-g4-time-032',
    version: 2,
    type: 'word-problem',
    difficulty: 4.5,
    gradeLevel: 4,
    question: {
      text: 'A school day has 6 class periods, each 50 minutes long. How many hours and minutes of class time are there in a day?'
    },
    answer: {
      type: 'exact',
      correct: '5 hours 0 minutes',
      acceptable: ['5 hours 0 minutes', '5 hours', '5 hrs', '5h 0m', '300 minutes', '5:00']
    },
    solution: {
      steps: [
        { number: 1, description: 'Find total minutes', latex: '6 \\times 50 = 300 \\text{ minutes}' },
        { number: 2, description: 'Convert to hours', latex: '300 \\div 60 = 5 \\text{ hours}' }
      ],
      method: 'Multiply, then convert'
    },
    hints: [
      { level: 'gentle', text: 'First find the total minutes (6 × 50), then convert to hours.' },
      { level: 'moderate', text: '6 × 50 = 300 minutes. How many 60s fit into 300?' },
      { level: 'explicit', text: '300 ÷ 60 = 5 hours exactly' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Scheduling',
      skills: ['multiplication', 'time_conversion'],
      prerequisites: ['multiplication', 'division'],
      concepts: ['scheduling', 'time-conversion', 'total-time'],
      commonMistakes: ['Forgetting to convert to hours', 'Division errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'scheduling', 'grade-4'] }
  },
  {
    id: 'word-v2-g5-time-033',
    version: 2,
    type: 'word-problem',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'A flight leaves New York at 8:30 AM and lands in Los Angeles at 11:45 AM local time. If Los Angeles is 3 hours behind New York, how long is the flight?'
    },
    answer: {
      type: 'exact',
      correct: '6 hours 15 minutes',
      acceptable: ['6 hours 15 minutes', '6h 15m', '6:15', '375 minutes', '6 hours and 15 minutes']
    },
    solution: {
      steps: [
        { number: 1, description: 'Convert LA time to NY time', latex: '11:45 + 3 = 14:45 = 2:45 \\text{ PM NY time}' },
        { number: 2, description: 'Calculate flight duration', latex: '2:45 \\text{ PM} - 8:30 \\text{ AM} = 6:15' }
      ],
      method: 'Adjust for time zone, then find elapsed time'
    },
    hints: [
      { level: 'gentle', text: 'If LA is 3 hours behind NY, what time is it in NY when the plane lands? Then find the difference.' },
      { level: 'moderate', text: '11:45 AM LA time = 2:45 PM NY time. How long from 8:30 AM to 2:45 PM?' },
      { level: 'explicit', text: 'From 8:30 AM to 2:45 PM is 6 hours 15 minutes.' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Scheduling',
      skills: ['time_zones', 'elapsed_time', 'time_addition'],
      prerequisites: ['telling_time', 'subtraction'],
      concepts: ['time-zones', 'flight-duration', 'scheduling'],
      commonMistakes: ['Subtracting instead of adding time zone difference', 'AM/PM confusion'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'scheduling', 'time-zones', 'grade-5'] }
  },
  {
    id: 'word-v2-g5-time-034',
    version: 2,
    type: 'word-problem',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'Carlos has 3 homework assignments. Math takes 35 minutes, reading takes 40 minutes, and science takes 25 minutes. If he starts at 4:00 PM and takes a 10-minute break between each subject, what time will he finish?'
    },
    answer: {
      type: 'exact',
      correct: '5:40 PM',
      acceptable: ['5:40 PM', '5:40 pm', '5:40', '17:40']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add homework times', latex: '35 + 40 + 25 = 100 \\text{ minutes}' },
        { number: 2, description: 'Add break times (2 breaks)', latex: '2 \\times 10 = 20 \\text{ minutes}' },
        { number: 3, description: 'Total time', latex: '100 + 20 = 120 \\text{ minutes} = 2 \\text{ hours}' },
        { number: 4, description: 'Add to start time', latex: '4:00 + 2:00 = 6:00 \\text{ PM}' }
      ],
      method: 'Sum all times including breaks'
    },
    hints: [
      { level: 'gentle', text: 'Add up all homework time plus 2 breaks (one after each subject except the last).' },
      { level: 'moderate', text: 'Work: 35+40+25=100 min. Breaks: 2×10=20 min. Total: 120 min = 2 hours.' },
      { level: 'explicit', text: '4:00 PM + 1 hour 40 minutes = 5:40 PM' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Scheduling',
      skills: ['addition', 'time_addition', 'multi_step'],
      prerequisites: ['addition', 'time_conversion'],
      concepts: ['scheduling', 'total-time', 'breaks'],
      commonMistakes: ['Adding 3 breaks instead of 2', 'Forgetting to include breaks'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'scheduling', 'grade-5'] }
  },
  {
    id: 'word-v2-g5-time-035',
    version: 2,
    type: 'word-problem',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'A bakery opens at 6:00 AM and closes at 2:00 PM. If the baker works a 5-day week, how many hours does she work per week?'
    },
    answer: {
      type: 'numeric',
      correct: '40',
      acceptable: ['40', '40 hours', '40 hrs', '40h'],
      unit: 'hours'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find hours per day', latex: '2:00 \\text{ PM} - 6:00 \\text{ AM} = 8 \\text{ hours}' },
        { number: 2, description: 'Multiply by days', latex: '8 \\times 5 = 40 \\text{ hours}' }
      ],
      method: 'Daily hours × days per week'
    },
    hints: [
      { level: 'gentle', text: 'First find how many hours from 6 AM to 2 PM, then multiply by 5 days.' },
      { level: 'moderate', text: '6 AM to 2 PM is 8 hours. 8 × 5 = ?' },
      { level: 'explicit', text: '8 hours/day × 5 days = 40 hours/week' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Scheduling',
      skills: ['elapsed_time', 'multiplication'],
      prerequisites: ['telling_time', 'multiplication'],
      concepts: ['work-hours', 'weekly-schedule', 'multiplication'],
      commonMistakes: ['Miscounting hours across noon', 'Forgetting to multiply by 5'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 75
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'scheduling', 'work-hours', 'grade-5'] }
  },

  // ============================================================================
  // TIME ZONES (5 problems) - Grades 5-6
  // ============================================================================
  {
    id: 'word-v2-g5-time-036',
    version: 2,
    type: 'word-problem',
    difficulty: 5.0,
    gradeLevel: 5,
    question: {
      text: 'When it is 3:00 PM in Chicago, it is 4:00 PM in New York (1 hour ahead). If a TV show airs at 8:00 PM Eastern (New York) time, what time should someone in Chicago tune in?'
    },
    answer: {
      type: 'exact',
      correct: '7:00 PM',
      acceptable: ['7:00 PM', '7:00 pm', '7:00', '19:00', '7 PM']
    },
    solution: {
      steps: [
        { number: 1, description: 'Chicago is 1 hour behind New York', latex: '8:00 \\text{ PM ET} - 1 \\text{ hour}' },
        { number: 2, description: 'Calculate Chicago time', latex: '8:00 - 1:00 = 7:00 \\text{ PM CT}' }
      ],
      method: 'Subtract time zone difference'
    },
    hints: [
      { level: 'gentle', text: 'If New York is 1 hour ahead, subtract 1 hour from New York time to get Chicago time.' },
      { level: 'moderate', text: '8:00 PM New York time is 8-1 = 7:00 PM in Chicago.' },
      { level: 'explicit', text: '8:00 PM Eastern = 7:00 PM Central (Chicago)' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Time Zones',
      skills: ['time_zones', 'subtraction'],
      prerequisites: ['telling_time', 'subtraction'],
      concepts: ['time-zones', 'eastern-time', 'central-time'],
      commonMistakes: ['Adding instead of subtracting', 'Confusing which zone is ahead'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'time-zones', 'grade-5'] }
  },
  {
    id: 'word-v2-g5-time-037',
    version: 2,
    type: 'word-problem',
    difficulty: 5.5,
    gradeLevel: 5,
    question: {
      text: 'London is 5 hours ahead of New York. If it is 9:00 AM in New York, what time is it in London?'
    },
    answer: {
      type: 'exact',
      correct: '2:00 PM',
      acceptable: ['2:00 PM', '2:00 pm', '2:00', '14:00', '2 PM']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 5 hours to New York time', latex: '9:00 \\text{ AM} + 5 \\text{ hours}' },
        { number: 2, description: 'Calculate', latex: '9 + 5 = 14:00 = 2:00 \\text{ PM}' }
      ],
      method: 'Add time zone difference'
    },
    hints: [
      { level: 'gentle', text: 'If London is ahead, add hours to New York time.' },
      { level: 'moderate', text: '9:00 AM + 5 hours. Count: 10, 11, 12, 1, 2...' },
      { level: 'explicit', text: '9:00 AM + 5 hours = 2:00 PM in London' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Time Zones',
      skills: ['time_zones', 'addition', 'am_pm_conversion'],
      prerequisites: ['telling_time', 'addition'],
      concepts: ['time-zones', 'international-time', 'am-pm'],
      commonMistakes: ['Subtracting instead of adding', 'AM/PM errors when crossing noon'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'time-zones', 'grade-5'] }
  },
  {
    id: 'word-v2-g6-time-038',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Tokyo is 14 hours ahead of New York. If a business meeting is scheduled for 9:00 AM Monday in New York, what time and day is it in Tokyo?'
    },
    answer: {
      type: 'exact',
      correct: '11:00 PM Monday',
      acceptable: ['11:00 PM Monday', '11 PM Monday', '23:00 Monday', '11:00 pm Monday']
    },
    solution: {
      steps: [
        { number: 1, description: 'Add 14 hours to 9:00 AM', latex: '9:00 \\text{ AM} + 14 \\text{ hours}' },
        { number: 2, description: 'Calculate', latex: '9 + 14 = 23:00 = 11:00 \\text{ PM}' },
        { number: 3, description: 'Check if day changes', latex: '23:00 < 24:00, \\text{ still Monday}' }
      ],
      method: 'Add hours, check for day change'
    },
    hints: [
      { level: 'gentle', text: 'Add 14 hours to 9 AM. If you pass midnight, the day changes.' },
      { level: 'moderate', text: '9 AM + 14 hours = 11 PM. Did we pass midnight? No, still Monday.' },
      { level: 'explicit', text: '9:00 AM Monday + 14 hours = 11:00 PM Monday in Tokyo' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Time Zones',
      skills: ['time_zones', 'addition', 'day_change'],
      prerequisites: ['telling_time', 'addition'],
      concepts: ['time-zones', 'date-line', 'international-time'],
      commonMistakes: ['Thinking the day changes (it doesn\'t quite)', '24-hour time errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'time-zones', 'grade-6'] }
  },
  {
    id: 'word-v2-g6-time-039',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'Sydney, Australia is 16 hours ahead of Los Angeles. If a live concert in Sydney starts at 7:00 PM Saturday, what time and day should viewers in Los Angeles watch?'
    },
    answer: {
      type: 'exact',
      correct: '3:00 AM Saturday',
      acceptable: ['3:00 AM Saturday', '3 AM Saturday', '03:00 Saturday', '3:00 am Saturday']
    },
    solution: {
      steps: [
        { number: 1, description: 'Subtract 16 hours from 7:00 PM (19:00)', latex: '19:00 - 16 = 3:00' },
        { number: 2, description: 'Since 3:00 is before noon on same day', latex: '3:00 \\text{ AM Saturday}' }
      ],
      method: 'Subtract time zone difference to go west'
    },
    hints: [
      { level: 'gentle', text: 'To find LA time, subtract 16 hours from Sydney time. Check if you cross midnight.' },
      { level: 'moderate', text: '7 PM = 19:00. 19 - 16 = 3. Since we didn\'t go negative, still Saturday.' },
      { level: 'explicit', text: '7:00 PM Saturday Sydney = 3:00 AM Saturday Los Angeles' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Time Zones',
      skills: ['time_zones', 'subtraction', '24_hour_time'],
      prerequisites: ['telling_time', 'subtraction'],
      concepts: ['time-zones', 'date-line', 'backwards-time'],
      commonMistakes: ['Going to Friday (oversubtracting days)', 'Subtracting from 12-hour instead of 24-hour'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'time-zones', 'grade-6'] }
  },
  {
    id: 'word-v2-g6-time-040',
    version: 2,
    type: 'word-problem',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'A video call connects participants in three cities: New York (EST), London (5 hours ahead of EST), and Tokyo (14 hours ahead of EST). If the call is at 8:00 AM in New York, what time is it for each participant?'
    },
    answer: {
      type: 'exact',
      correct: 'NY: 8 AM, London: 1 PM, Tokyo: 10 PM',
      acceptable: ['NY: 8 AM, London: 1 PM, Tokyo: 10 PM', '8 AM, 1 PM, 10 PM', '8:00 AM, 1:00 PM, 10:00 PM']
    },
    solution: {
      steps: [
        { number: 1, description: 'New York time (given)', latex: '8:00 \\text{ AM EST}' },
        { number: 2, description: 'London = NY + 5', latex: '8:00 + 5 = 1:00 \\text{ PM}' },
        { number: 3, description: 'Tokyo = NY + 14', latex: '8:00 + 14 = 22:00 = 10:00 \\text{ PM}' }
      ],
      method: 'Add time differences from base time'
    },
    hints: [
      { level: 'gentle', text: 'Add 5 hours for London and 14 hours for Tokyo to New York\'s 8 AM.' },
      { level: 'moderate', text: 'London: 8+5=1 PM. Tokyo: 8+14=22=10 PM.' },
      { level: 'explicit', text: 'New York: 8:00 AM, London: 1:00 PM, Tokyo: 10:00 PM' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Time Zones',
      skills: ['time_zones', 'addition', 'multi_step'],
      prerequisites: ['telling_time', 'addition'],
      concepts: ['time-zones', 'multiple-zones', 'international-business'],
      commonMistakes: ['Mixing up additions', 'AM/PM errors for Tokyo'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'time-zones', 'multi-city', 'grade-6'] }
  },

  // ============================================================================
  // SPEED AND DISTANCE (5 problems) - Grades 6-7
  // ============================================================================
  {
    id: 'word-v2-g6-time-041',
    version: 2,
    type: 'word-problem',
    difficulty: 6.0,
    gradeLevel: 6,
    question: {
      text: 'A car travels at 60 miles per hour. How far will it travel in 2.5 hours?',
      latex: 'd = rt'
    },
    answer: {
      type: 'numeric',
      correct: '150',
      acceptable: ['150', '150 miles', '150 mi', '150mi'],
      unit: 'miles'
    },
    solution: {
      steps: [
        { number: 1, description: 'Use distance formula', latex: 'd = rt' },
        { number: 2, description: 'Substitute values', latex: 'd = 60 \\times 2.5' },
        { number: 3, description: 'Calculate', latex: 'd = 150 \\text{ miles}' }
      ],
      method: 'Distance = rate × time'
    },
    hints: [
      { level: 'gentle', text: 'Use the formula: distance = speed × time.' },
      { level: 'moderate', text: 'd = 60 mph × 2.5 hours' },
      { level: 'explicit', text: 'd = 60 × 2.5 = 150 miles' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Speed and Distance',
      skills: ['distance_formula', 'decimal_multiplication'],
      prerequisites: ['multiplication', 'decimals'],
      concepts: ['distance', 'rate', 'time', 'd=rt'],
      commonMistakes: ['Dividing instead of multiplying', 'Decimal errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'speed-distance', 'grade-6'] }
  },
  {
    id: 'word-v2-g6-time-042',
    version: 2,
    type: 'word-problem',
    difficulty: 6.5,
    gradeLevel: 6,
    question: {
      text: 'A cyclist rides 36 miles in 3 hours. What is her average speed in miles per hour?',
      latex: 'r = \\frac{d}{t}'
    },
    answer: {
      type: 'numeric',
      correct: '12',
      acceptable: ['12', '12 mph', '12 miles per hour', '12mi/h'],
      unit: 'mph'
    },
    solution: {
      steps: [
        { number: 1, description: 'Use rate formula', latex: 'r = \\frac{d}{t}' },
        { number: 2, description: 'Substitute values', latex: 'r = \\frac{36}{3}' },
        { number: 3, description: 'Calculate', latex: 'r = 12 \\text{ mph}' }
      ],
      method: 'Rate = distance ÷ time'
    },
    hints: [
      { level: 'gentle', text: 'To find speed, divide distance by time.' },
      { level: 'moderate', text: 'Speed = 36 miles ÷ 3 hours' },
      { level: 'explicit', text: 'Speed = 36 ÷ 3 = 12 mph' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Speed and Distance',
      skills: ['rate_formula', 'division'],
      prerequisites: ['division'],
      concepts: ['average-speed', 'rate', 'distance'],
      commonMistakes: ['Multiplying instead of dividing', 'Mixing up dividend and divisor'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'speed-distance', 'grade-6'] }
  },
  {
    id: 'word-v2-g7-time-043',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A train travels 240 miles at 80 miles per hour. How many hours does the trip take?',
      latex: 't = \\frac{d}{r}'
    },
    answer: {
      type: 'numeric',
      correct: '3',
      acceptable: ['3', '3 hours', '3 hrs', '3h'],
      unit: 'hours'
    },
    solution: {
      steps: [
        { number: 1, description: 'Use time formula', latex: 't = \\frac{d}{r}' },
        { number: 2, description: 'Substitute values', latex: 't = \\frac{240}{80}' },
        { number: 3, description: 'Calculate', latex: 't = 3 \\text{ hours}' }
      ],
      method: 'Time = distance ÷ rate'
    },
    hints: [
      { level: 'gentle', text: 'To find time, divide distance by speed.' },
      { level: 'moderate', text: 'Time = 240 miles ÷ 80 mph' },
      { level: 'explicit', text: 'Time = 240 ÷ 80 = 3 hours' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Speed and Distance',
      skills: ['time_formula', 'division'],
      prerequisites: ['division'],
      concepts: ['travel-time', 'rate', 'distance'],
      commonMistakes: ['Multiplying instead of dividing', 'Using wrong formula'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'speed-distance', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-time-044',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A car travels at 65 mph for the first 2 hours, then at 55 mph for the next 3 hours. What is the total distance traveled?',
      latex: 'd = rt'
    },
    answer: {
      type: 'numeric',
      correct: '295',
      acceptable: ['295', '295 miles', '295 mi'],
      unit: 'miles'
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate distance for first part', latex: 'd_1 = 65 \\times 2 = 130 \\text{ miles}' },
        { number: 2, description: 'Calculate distance for second part', latex: 'd_2 = 55 \\times 3 = 165 \\text{ miles}' },
        { number: 3, description: 'Add the distances', latex: 'd_{total} = 130 + 165 = 295 \\text{ miles}' }
      ],
      method: 'Calculate each segment, sum distances'
    },
    hints: [
      { level: 'gentle', text: 'Calculate distance for each part of the trip using d = rt, then add them.' },
      { level: 'moderate', text: 'First part: 65 × 2 = 130. Second part: 55 × 3 = 165. Total?' },
      { level: 'explicit', text: '130 + 165 = 295 miles total' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Speed and Distance',
      skills: ['distance_formula', 'multiplication', 'multi_step'],
      prerequisites: ['multiplication', 'addition'],
      concepts: ['distance', 'rate', 'time', 'multi-segment'],
      commonMistakes: ['Averaging speeds instead of calculating each segment', 'Mixing up rates and times'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'speed-distance', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-time-045',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Two cities are 360 miles apart. A bus leaves City A at 8:00 AM traveling at 45 mph toward City B. What time will it arrive in City B?'
    },
    answer: {
      type: 'exact',
      correct: '4:00 PM',
      acceptable: ['4:00 PM', '4:00 pm', '4:00', '16:00', '4 PM']
    },
    solution: {
      steps: [
        { number: 1, description: 'Calculate travel time', latex: 't = \\frac{360}{45} = 8 \\text{ hours}' },
        { number: 2, description: 'Add to departure time', latex: '8:00 \\text{ AM} + 8 \\text{ hours} = 4:00 \\text{ PM}' }
      ],
      method: 'Find time, add to departure'
    },
    hints: [
      { level: 'gentle', text: 'First find how long the trip takes (distance ÷ speed), then add to 8:00 AM.' },
      { level: 'moderate', text: 'Time = 360 ÷ 45 = 8 hours. 8 AM + 8 hours = ?' },
      { level: 'explicit', text: '8:00 AM + 8 hours = 4:00 PM' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Speed and Distance',
      skills: ['time_formula', 'division', 'time_addition'],
      prerequisites: ['division', 'telling_time'],
      concepts: ['travel-time', 'arrival-time', 'distance'],
      commonMistakes: ['AM/PM errors', 'Division errors'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 90
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'speed-distance', 'grade-7'] }
  },

  // ============================================================================
  // WORK RATE PROBLEMS (5 problems) - Grade 7
  // ============================================================================
  {
    id: 'word-v2-g7-time-046',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Maria can paint a room in 6 hours. How much of the room can she paint in 1 hour?'
    },
    answer: {
      type: 'fraction',
      correct: '1/6',
      acceptable: ['1/6', '⅙', 'one-sixth', '0.167', '16.7%']
    },
    solution: {
      steps: [
        { number: 1, description: 'Work rate = 1 job ÷ time', latex: '\\text{Rate} = \\frac{1 \\text{ room}}{6 \\text{ hours}}' },
        { number: 2, description: 'Simplify', latex: '\\text{Rate} = \\frac{1}{6} \\text{ room per hour}' }
      ],
      method: 'Rate = 1 ÷ total time'
    },
    hints: [
      { level: 'gentle', text: 'If a whole job takes 6 hours, what fraction is done in 1 hour?' },
      { level: 'moderate', text: 'In 1 hour, she does 1/6 of the total job.' },
      { level: 'explicit', text: 'Rate = 1/6 of the room per hour' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Work Rate Problems',
      skills: ['work_rate', 'fractions', 'unit_rate'],
      prerequisites: ['fractions', 'division'],
      concepts: ['work-rate', 'unit-rate', 'fractions'],
      commonMistakes: ['Saying she paints 6 rooms in 1 hour', 'Inverting the fraction'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'understand',
      timeEstimate: 60
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'work-rate', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-time-047',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A printer can print a document in 4 minutes. A faster printer can print the same document in 2 minutes. If both printers work together, how long will it take to print one document?',
      latex: '\\frac{1}{t_1} + \\frac{1}{t_2} = \\frac{1}{t}'
    },
    answer: {
      type: 'numeric',
      correct: '1.33',
      acceptable: ['1.33', '1.333', '4/3', '1⅓', '1 1/3', '1.3', '80 seconds'],
      unit: 'minutes'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find each rate', latex: '\\text{Rate}_1 = \\frac{1}{4}, \\text{Rate}_2 = \\frac{1}{2}' },
        { number: 2, description: 'Add rates', latex: '\\frac{1}{4} + \\frac{1}{2} = \\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}' },
        { number: 3, description: 'Find combined time', latex: 't = \\frac{1}{\\frac{3}{4}} = \\frac{4}{3} \\approx 1.33 \\text{ min}' }
      ],
      method: 'Add rates, invert for time'
    },
    hints: [
      { level: 'gentle', text: 'Each printer has a rate (jobs per minute). Add the rates, then find the combined time.' },
      { level: 'moderate', text: 'Rate 1 = 1/4 job/min, Rate 2 = 1/2 job/min. Combined = 1/4 + 1/2 = 3/4 job/min.' },
      { level: 'explicit', text: 'Time = 1 ÷ (3/4) = 4/3 ≈ 1.33 minutes' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Work Rate Problems',
      skills: ['work_rate', 'fraction_addition', 'reciprocals'],
      prerequisites: ['fractions', 'fraction_addition'],
      concepts: ['combined-work-rate', 'reciprocals', 'parallel-work'],
      commonMistakes: ['Adding times instead of rates (4+2=6)', 'Forgetting to take reciprocal'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'work-rate', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-time-048',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Jake can mow a lawn in 3 hours. His brother can mow the same lawn in 6 hours. How long will it take them working together?',
      latex: '\\frac{1}{t_1} + \\frac{1}{t_2} = \\frac{1}{t}'
    },
    answer: {
      type: 'numeric',
      correct: '2',
      acceptable: ['2', '2 hours', '2 hrs', '2h'],
      unit: 'hours'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find each rate', latex: '\\text{Jake} = \\frac{1}{3}, \\text{Brother} = \\frac{1}{6}' },
        { number: 2, description: 'Add rates', latex: '\\frac{1}{3} + \\frac{1}{6} = \\frac{2}{6} + \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}' },
        { number: 3, description: 'Find combined time', latex: 't = \\frac{1}{\\frac{1}{2}} = 2 \\text{ hours}' }
      ],
      method: 'Add rates, invert for time'
    },
    hints: [
      { level: 'gentle', text: 'Find each person\'s rate (what fraction they complete per hour), add them, then find the time.' },
      { level: 'moderate', text: 'Jake: 1/3 lawn/hr, Brother: 1/6 lawn/hr. Together: 1/3 + 1/6 = 1/2 lawn/hr.' },
      { level: 'explicit', text: 'At 1/2 lawn per hour, it takes 2 hours to complete 1 lawn.' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Work Rate Problems',
      skills: ['work_rate', 'fraction_addition', 'reciprocals'],
      prerequisites: ['fractions', 'fraction_addition'],
      concepts: ['combined-work-rate', 'cooperative-work', 'rates'],
      commonMistakes: ['Adding times (3+6=9)', 'Averaging times'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'work-rate', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-time-049',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'A tank can be filled by Pipe A in 5 hours and by Pipe B in 10 hours. If both pipes are open, how long will it take to fill the tank?',
      latex: '\\frac{1}{t_1} + \\frac{1}{t_2} = \\frac{1}{t}'
    },
    answer: {
      type: 'numeric',
      correct: '3.33',
      acceptable: ['3.33', '3.333', '10/3', '3⅓', '3 1/3', '3.3'],
      unit: 'hours'
    },
    solution: {
      steps: [
        { number: 1, description: 'Find each rate', latex: '\\text{A} = \\frac{1}{5}, \\text{B} = \\frac{1}{10}' },
        { number: 2, description: 'Add rates', latex: '\\frac{1}{5} + \\frac{1}{10} = \\frac{2}{10} + \\frac{1}{10} = \\frac{3}{10}' },
        { number: 3, description: 'Find combined time', latex: 't = \\frac{1}{\\frac{3}{10}} = \\frac{10}{3} \\approx 3.33 \\text{ hours}' }
      ],
      method: 'Combined work rate formula'
    },
    hints: [
      { level: 'gentle', text: 'Each pipe fills a fraction of the tank per hour. Add these rates to find the combined rate.' },
      { level: 'moderate', text: 'Pipe A: 1/5 tank/hr, Pipe B: 1/10 tank/hr. Combined: 1/5 + 1/10 = 3/10 tank/hr.' },
      { level: 'explicit', text: 'Time = 1 ÷ (3/10) = 10/3 ≈ 3.33 hours' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Work Rate Problems',
      skills: ['work_rate', 'fraction_addition', 'reciprocals'],
      prerequisites: ['fractions', 'fraction_addition'],
      concepts: ['combined-work-rate', 'filling-problems', 'rates'],
      commonMistakes: ['Adding times directly', 'Errors with fraction common denominators'],
      scaffoldingLevel: 'moderate',
      cognitiveLevel: 'apply',
      timeEstimate: 120
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'work-rate', 'grade-7'] }
  },
  {
    id: 'word-v2-g7-time-050',
    version: 2,
    type: 'word-problem',
    difficulty: 7.0,
    gradeLevel: 7,
    question: {
      text: 'Working alone, Sarah can complete a project in 8 hours. Together with Tom, they can complete it in 3 hours. How long would it take Tom to complete the project alone?',
      latex: '\\frac{1}{t_S} + \\frac{1}{t_T} = \\frac{1}{t_{combined}}'
    },
    answer: {
      type: 'numeric',
      correct: '4.8',
      acceptable: ['4.8', '4.8 hours', '24/5', '4⅘', '4 4/5'],
      unit: 'hours'
    },
    solution: {
      steps: [
        { number: 1, description: 'Set up equation', latex: '\\frac{1}{8} + \\frac{1}{t_T} = \\frac{1}{3}' },
        { number: 2, description: 'Solve for Tom\'s rate', latex: '\\frac{1}{t_T} = \\frac{1}{3} - \\frac{1}{8} = \\frac{8-3}{24} = \\frac{5}{24}' },
        { number: 3, description: 'Find Tom\'s time', latex: 't_T = \\frac{24}{5} = 4.8 \\text{ hours}' }
      ],
      method: 'Use combined rate formula, solve for unknown'
    },
    hints: [
      { level: 'gentle', text: 'Use 1/8 + 1/Tom = 1/3 and solve for Tom\'s time.' },
      { level: 'moderate', text: '1/Tom = 1/3 - 1/8. Find a common denominator and subtract.' },
      { level: 'explicit', text: '1/3 - 1/8 = 8/24 - 3/24 = 5/24. So Tom = 24/5 = 4.8 hours.' }
    ],
    pedagogy: {
      topic: 'Time Word Problems',
      subTopic: 'Work Rate Problems',
      skills: ['work_rate', 'fraction_subtraction', 'algebraic_reasoning'],
      prerequisites: ['fractions', 'solving_equations'],
      concepts: ['work-rate', 'algebraic-thinking', 'rates'],
      commonMistakes: ['Subtracting times (8-3=5)', 'Fraction subtraction errors'],
      scaffoldingLevel: 'minimal',
      cognitiveLevel: 'analyze',
      timeEstimate: 150
    },
    metadata: { source: 'ai-generated', createdAt: now, tags: ['word-problem', 'time', 'work-rate', 'algebra', 'grade-7'] }
  }
]

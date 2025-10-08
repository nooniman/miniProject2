// Mock workout data
export const workouts = [
  {
    id: 1,
    name: 'Morning Run',
    type: 'cardio',
    duration: 30,
    calories: 300,
    description: 'Start your day with an energizing 30-minute run',
    difficulty: 'intermediate',
    logs: [
      { day: 'monday', distance: '5km', time: '28:30', notes: 'Felt great!' },
      { day: 'wednesday', distance: '5.5km', time: '29:15', notes: 'Slightly faster today' },
      { day: 'friday', distance: '6km', time: '31:00', notes: 'Pushed harder' }
    ]
  },
  {
    id: 2,
    name: 'Chest & Triceps',
    type: 'strength',
    duration: 45,
    calories: 250,
    description: 'Upper body strength training focusing on chest and triceps',
    difficulty: 'advanced',
    logs: [
      { day: 'tuesday', sets: '4x10', weight: '60kg', notes: 'Bench press PR!' },
      { day: 'thursday', sets: '4x10', weight: '62kg', notes: 'Increased weight' },
      { day: 'saturday', sets: '4x8', weight: '65kg', notes: 'Heavy day' }
    ]
  },
  {
    id: 3,
    name: 'HIIT Cardio',
    type: 'cardio',
    duration: 20,
    calories: 400,
    description: 'High-intensity interval training for maximum calorie burn',
    difficulty: 'advanced',
    logs: [
      { day: 'monday', rounds: '10', avgHR: '165 bpm', notes: 'Intense session' },
      { day: 'friday', rounds: '12', avgHR: '170 bpm', notes: 'New record!' }
    ]
  },
  {
    id: 4,
    name: 'Leg Day',
    type: 'strength',
    duration: 60,
    calories: 350,
    description: 'Complete lower body workout including squats and lunges',
    difficulty: 'intermediate',
    logs: [
      { day: 'wednesday', sets: '5x5', weight: '100kg', notes: 'Squats feeling strong' },
      { day: 'saturday', sets: '5x5', weight: '105kg', notes: 'Increased squat weight' }
    ]
  },
  {
    id: 5,
    name: 'Yoga Flow',
    type: 'cardio',
    duration: 40,
    calories: 150,
    description: 'Relaxing yoga session to improve flexibility and mindfulness',
    difficulty: 'beginner',
    logs: [
      { day: 'sunday', poses: '20', duration: '45 min', notes: 'Very relaxing' },
      { day: 'thursday', poses: '22', duration: '40 min', notes: 'Better balance today' }
    ]
  },
  {
    id: 6,
    name: 'Back & Biceps',
    type: 'strength',
    duration: 50,
    calories: 280,
    description: 'Pull day focusing on back muscles and biceps',
    difficulty: 'intermediate',
    logs: [
      { day: 'monday', sets: '4x8', weight: '50kg', notes: 'Deadlift day' },
      { day: 'friday', sets: '4x8', weight: '52kg', notes: 'Form improving' }
    ]
  },
  {
    id: 7,
    name: 'Cycling',
    type: 'cardio',
    duration: 45,
    calories: 380,
    description: 'Outdoor or indoor cycling for endurance',
    difficulty: 'beginner',
    logs: [
      { day: 'tuesday', distance: '15km', avgSpeed: '22 km/h', notes: 'Beautiful weather' },
      { day: 'saturday', distance: '18km', avgSpeed: '24 km/h', notes: 'Faster pace' }
    ]
  },
  {
    id: 8,
    name: 'Core Strength',
    type: 'strength',
    duration: 25,
    calories: 180,
    description: 'Targeted core workout for abs and obliques',
    difficulty: 'beginner',
    logs: [
      { day: 'wednesday', exercises: '8', reps: '3x15', notes: 'Planks getting easier' },
      { day: 'sunday', exercises: '10', reps: '3x20', notes: 'Added new exercises' }
    ]
  }
];

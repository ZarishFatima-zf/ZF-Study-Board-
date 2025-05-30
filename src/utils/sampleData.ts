import { Assignment, CalendarEvent, Course, TimeSlot } from '../types';

export const generateSampleData = () => {
  // Sample courses
  const courses: Course[] = [
    {
      id: '1',
      name: 'Introduction to Computer Science',
      instructor: 'Prof. Badar Sami',
      color: '#3b82f6', // primary-500
      location: 'Ubit Building, FF-23',
    },
    {
      id: '2',
      name: 'Calculus I',
      instructor: 'Prof. Hafsa',
      color: '#14b8a6', // secondary-500
      location: 'UBIT Building, FF-22',
    },
    {
      id: '3',
      name: 'English Literature',
      instructor: 'Dr. Rabia ',
      color: '#6366f1', // accent-500
      location: 'Ubit Building, GF-22',
    },
    {
      id: '4',
      name: 'Urdu 101',
      instructor: 'PROF. Roshan',
      color: '#f59e0b', // warning-500
      location: ' Urdu Building, Room 203',
    },
     {
      id: '5',
      name: 'Physics 101',
      instructor: 'Dr. Brown',
      color: 'purple', // warning-500
      location: 'Science Building, Room 203',
    },
     {
      id: '6',
      name: 'RDBMS 403',
      instructor: 'Dr. Khalid Jamal',
      color: 'green', // warning-500
      location: 'UBIT Building, SF- 17',
    },
     {
      id: '7',
      name: 'Numerical 511',
      instructor: 'Dr. Shaista ',
      color: 'skyblue', // warning-500
      location: 'UBIT Building, GF-23',
    },
     {
      id: '8',
      name: 'TOCI',
      instructor: 'Dr. Asim',
      color: '#pink', // warning-500
      location: 'UBIT Building, SF-16',
    },
     {
      id: '9',
      name: 'Accounting 503',
      instructor: 'Dr. Farhan',
      color: 'peach', // warning-500
      location: 'UBIT Building, FF-16',
    },
  ];

  // Sample time slots
  const timeSlots: TimeSlot[] = [
    {
      id: '1',
      courseId: '1',
      day: 'monday',
      startTime: '09:00',
      endTime: '10:30',
    },
    {
      id: '2',
      courseId: '1',
      day: 'wednesday',
      startTime: '09:00',
      endTime: '10:30',
    },
    {
      id: '3',
      courseId: '2',
      day: 'tuesday',
      startTime: '11:00',
      endTime: '12:30',
    },
    {
      id: '4',
      courseId: '2',
      day: 'thursday',
      startTime: '11:00',
      endTime: '12:30',
    },
    {
      id: '5',
      courseId: '8',
      day: 'monday',
      startTime: '14:00',
      endTime: '15:30',
    },
    {
      id: '6',
      courseId: '7',
      day: 'friday',
      startTime: '14:00',
      endTime: '15:30',
    },
    {
      id: '7',
      courseId: '6',
      day: 'tuesday',
      startTime: '15:30',
      endTime: '17:00',
    },
    {
      id: '8',
      courseId: '9',
      day: 'thursday',
      startTime: '15:30',
      endTime: '17:00',
    },
  ];

  // Get current date
  const today = new Date();
  
  // Create dates for upcoming assignments (next 2 weeks)
  const getTomorrow = () => {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString();
  };
  
  const getNextWeek = () => {
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString();
  };
  
  const getTwoWeeksLater = () => {
    const twoWeeks = new Date(today);
    twoWeeks.setDate(twoWeeks.getDate() + 14);
    return twoWeeks.toISOString();
  };

  // Sample assignments
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Programming Assignment 1',
      description: 'Implement a simple calculator using JavaScript',
      courseId: '1',
      dueDate: getTomorrow(),
      priority: 'high',
      status: 'in-progress',
      createdAt: today.toISOString(),
    },
    {
      id: '2',
      title: 'Calculus Problem Set 3',
      description: 'Complete problems 1-15 in Chapter 3',
      courseId: '2',
      dueDate: getNextWeek(),
      priority: 'medium',
      status: 'todo',
      createdAt: today.toISOString(),
    },
    {
      id: '3',
      title: 'Essay on Shakespeare',
      description: 'Write a 1000-word essay on themes in Hamlet',
      courseId: '3',
      dueDate: getTwoWeeksLater(),
      priority: 'medium',
      status: 'todo',
      createdAt: today.toISOString(),
    },
    {
      id: '4',
      title: ' Lab Report',
      description: 'Complete the lab report 2',
      courseId: '9',
      dueDate: getNextWeek(),
      priority: 'high',
      status: 'todo',
      createdAt: today.toISOString(),
    },
  ];

  // Sample calendar events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Programming Assignment 1 Due',
      date: getTomorrow(),
      type: 'assignment',
      courseId: '1',
    },
    {
      id: '2',
      title: 'Calculus Exam',
      description: 'Covers Chapters 1-3',
      date: getTwoWeeksLater(),
      type: 'exam',
      courseId: '2',
    },
    {
      id: '3',
      title: 'English  Paper Due',
      date: getTwoWeeksLater(),
      type: 'assignment',
      courseId: '3',
    },
    {
      id: '4',
      title: 'Study Group Meeting',
      description: 'Accounting study group in library',
      date: getNextWeek(),
      type: 'reminder',
      courseId: '9',
    },
  ];

  return { courses, timeSlots, assignments, events };
};
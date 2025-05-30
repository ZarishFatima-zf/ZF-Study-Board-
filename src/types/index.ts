export interface Course {
  id: string;
  name: string;
  instructor: string;
  color: string;
  location: string;
}

export interface TimeSlot {
  id: string;
  courseId: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string; // Format: HH:MM (24-hour)
  endTime: string; // Format: HH:MM (24-hour)
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string; // ISO string
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: string; // ISO string
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO string
  type: 'assignment' | 'exam' | 'reminder';
  courseId?: string;
  color?: string;
}

export interface User {
  name: string;
  email: string;
  theme: 'light' | 'dark';
}
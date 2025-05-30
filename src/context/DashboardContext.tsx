import React, { createContext, useContext, useState, useEffect } from 'react';
import { Assignment, CalendarEvent, Course, TimeSlot, User } from '../types';
import { generateSampleData } from '../utils/sampleData';

interface DashboardContextType {
  user: User;
  courses: Course[];
  timeSlots: TimeSlot[];
  assignments: Assignment[];
  events: CalendarEvent[];
  updateUser: (user: User) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  addTimeSlot: (timeSlot: TimeSlot) => void;
  updateTimeSlot: (timeSlot: TimeSlot) => void;
  deleteTimeSlot: (id: string) => void;
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  toggleTheme: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) return JSON.parse(savedUser);
    return { name: 'Student', email: 'student@example.com', theme: 'light' };
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) return JSON.parse(savedCourses);
    return [];
  });

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(() => {
    const savedTimeSlots = localStorage.getItem('timeSlots');
    if (savedTimeSlots) return JSON.parse(savedTimeSlots);
    return [];
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const savedAssignments = localStorage.getItem('assignments');
    if (savedAssignments) return JSON.parse(savedAssignments);
    return [];
  });

  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) return JSON.parse(savedEvents);
    return [];
  });

  // Initialize with sample data if no data exists
  useEffect(() => {
    if (courses.length === 0 && timeSlots.length === 0 && assignments.length === 0) {
      const sampleData = generateSampleData();
      setCourses(sampleData.courses);
      setTimeSlots(sampleData.timeSlots);
      setAssignments(sampleData.assignments);
      setEvents(sampleData.events);
    }
  }, [courses.length, timeSlots.length, assignments.length]);

  // Apply theme
  useEffect(() => {
    if (user.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user.theme]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots));
  }, [timeSlots]);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(course => course.id === updatedCourse.id ? updatedCourse : course));
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const addTimeSlot = (timeSlot: TimeSlot) => {
    setTimeSlots([...timeSlots, timeSlot]);
  };

  const updateTimeSlot = (updatedTimeSlot: TimeSlot) => {
    setTimeSlots(timeSlots.map(timeSlot => timeSlot.id === updatedTimeSlot.id ? updatedTimeSlot : timeSlot));
  };

  const deleteTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(timeSlot => timeSlot.id !== id));
  };

  const addAssignment = (assignment: Assignment) => {
    setAssignments([...assignments, assignment]);
  };

  const updateAssignment = (updatedAssignment: Assignment) => {
    setAssignments(assignments.map(assignment => assignment.id === updatedAssignment.id ? updatedAssignment : assignment));
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  const addEvent = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const toggleTheme = () => {
    setUser({ ...user, theme: user.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        courses,
        timeSlots,
        assignments,
        events,
        updateUser,
        addCourse,
        updateCourse,
        deleteCourse,
        addTimeSlot,
        updateTimeSlot,
        deleteTimeSlot,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleTheme,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
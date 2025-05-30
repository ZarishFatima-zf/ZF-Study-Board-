import { format, isToday, isTomorrow, parseISO, isThisWeek, isAfter, differenceInDays } from 'date-fns';

// Format a date string to a readable format
export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`;
  }
  if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, 'h:mm a')}`;
  }
  return format(date, 'MMM d, yyyy');
};

// Format time from 24-hour format to 12-hour format
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Get urgency level based on due date
export const getUrgencyLevel = (dateString: string): 'none' | 'low' | 'medium' | 'high' => {
  const date = parseISO(dateString);
  const today = new Date();
  
  if (isToday(date)) {
    return 'high';
  }
  
  if (isTomorrow(date)) {
    return 'medium';
  }
  
  if (isThisWeek(date)) {
    return 'low';
  }
  
  return 'none';
};

// Check if a date is past
export const isPastDue = (dateString: string): boolean => {
  const date = parseISO(dateString);
  const now = new Date();
  return isAfter(now, date);
};

// Get days remaining until the date
export const getDaysRemaining = (dateString: string): number => {
  const date = parseISO(dateString);
  const today = new Date();
  return differenceInDays(date, today);
};

// Get day of week from date
export const getDayOfWeek = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'EEEE');
};

// Get short day name from full day name
export const getShortDay = (day: string): string => {
  const days: Record<string, string> = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  };
  
  return days[day.toLowerCase()] || day.slice(0, 3);
};
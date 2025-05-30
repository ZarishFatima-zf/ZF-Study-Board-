import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar: React.FC = () => {
  const { assignments, events, courses } = useDashboard();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // Navigation functions
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Get assignments due on this date
    const assignmentEvents = assignments.filter(assignment => 
      format(parseISO(assignment.dueDate), 'yyyy-MM-dd') === formattedDate
    );
    
    // Get calendar events on this date
    const calendarEvents = events.filter(event => 
      format(parseISO(event.date), 'yyyy-MM-dd') === formattedDate
    );
    
    return [...assignmentEvents, ...calendarEvents];
  };

  // Count events for a specific date (for the small dots on calendar)
  const countEventsForDate = (date: Date) => {
    return getEventsForDate(date).length;
  };

  // Format assignments and events for the selected date view
  const formattedEvents = getEventsForDate(selectedDate).map(item => {
    // Check if it's an assignment
    if ('status' in item) {
      const assignment = item as typeof assignments[0];
      const course = courses.find(c => c.id === assignment.courseId);
      
      return {
        id: assignment.id,
        title: assignment.title,
        description: assignment.description,
        time: format(parseISO(assignment.dueDate), 'h:mm a'),
        course: course?.name || '',
        color: course?.color || '#888',
        type: 'assignment',
        priority: assignment.priority,
      };
    } else {
      // It's a calendar event
      const event = item as typeof events[0];
      const course = event.courseId ? courses.find(c => c.id === event.courseId) : null;
      
      return {
        id: event.id,
        title: event.title,
        description: event.description || '',
        time: format(parseISO(event.date), 'h:mm a'),
        course: course?.name || '',
        color: event.color || course?.color || '#888',
        type: event.type,
      };
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Calendar</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={prevMonth}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div 
                key={day}
                className="h-8 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map(day => {
              const formattedDay = format(day, 'd');
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isToday = isSameDay(day, new Date());
              const isSelected = isSameDay(day, selectedDate);
              const eventCount = countEventsForDate(day);
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    p-1 h-24 relative border border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors
                    ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                    ${isToday ? 'bg-primary-50 dark:bg-primary-900/30' : ''}
                    ${isSelected ? 'border-primary-500 dark:border-primary-400' : ''}
                  `}
                >
                  <div className={`
                    w-8 h-8 flex items-center justify-center rounded-full mb-1
                    ${isToday ? 'bg-primary-500 text-white' : ''}
                  `}>
                    {formattedDay}
                  </div>
                  
                  {/* Event indicators */}
                  {eventCount > 0 && (
                    <div className="absolute bottom-1 right-1">
                      <div className="flex space-x-1">
                        {Array.from({ length: Math.min(eventCount, 3) }).map((_, i) => (
                          <div 
                            key={i} 
                            className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400"
                          />
                        ))}
                        {eventCount > 3 && (
                          <span className="text-xs text-primary-500 dark:text-primary-400">+{eventCount - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              {format(selectedDate, 'EEEE, MMMM d')}
            </h2>
            <Badge variant={isSameDay(selectedDate, new Date()) ? 'primary' : 'secondary'}>
              {isSameDay(selectedDate, new Date()) ? 'Today' : format(selectedDate, 'MMM d')}
            </Badge>
          </div>
          
          {formattedEvents.length > 0 ? (
            <div className="space-y-3">
              {formattedEvents.map(event => (
                <div 
                  key={`${event.id}-${event.type}`}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all"
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: event.color,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                      {event.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <Badge 
                      variant={
                        event.type === 'assignment' ? 'primary' : 
                        event.type === 'exam' ? 'error' : 
                        'warning'
                      }
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <div className="text-gray-500 dark:text-gray-400">
                      {event.time}
                    </div>
                    {event.course && (
                      <div className="text-gray-600 dark:text-gray-300">
                        {event.course}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No events for this date</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
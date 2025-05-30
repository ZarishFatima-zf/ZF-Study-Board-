import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { formatTime, getShortDay } from '../../utils/dateUtils';
import Card from '../ui/Card';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const timeSlots = Array.from({ length: 14 }, (_, i) => `${i + 8}:00`); // 8:00 AM to 9:00 PM

const Timetable: React.FC = () => {
  const { courses, timeSlots: scheduleSlots } = useDashboard();
  
  const getCourseById = (id: string) => courses.find(course => course.id === id);
  
  const getClassesForDayAndTime = (day: string, time: string) => {
    const hour = parseInt(time.split(':')[0], 10);
    
    return scheduleSlots.filter(slot => {
      const startHour = parseInt(slot.startTime.split(':')[0], 10);
      const endHour = parseInt(slot.endTime.split(':')[0], 10);
      
      return slot.day === day && startHour <= hour && endHour > hour;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Weekly Timetable</h1>
      </div>
      
      <Card className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-1">
            {/* Time column header */}
            <div className="h-12 flex items-center justify-center font-medium bg-gray-100 dark:bg-gray-700 rounded-tl-lg">
              Time
            </div>
            
            {/* Day headers */}
            {days.map(day => (
              <div key={day} className="h-12 flex items-center justify-center font-medium bg-gray-100 dark:bg-gray-700 capitalize">
                {getShortDay(day)}
              </div>
            ))}
            
            {/* Time slots */}
            {timeSlots.map((time, timeIndex) => (
              <React.Fragment key={time}>
                {/* Time label */}
                <div className={`h-20 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm text-gray-500 ${timeIndex === timeSlots.length - 1 ? 'rounded-bl-lg' : ''}`}>
                  {formatTime(time)}
                </div>
                
                {/* Day cells */}
                {days.map((day, dayIndex) => {
                  const classes = getClassesForDayAndTime(day, time);
                  const isLastTimeSlot = timeIndex === timeSlots.length - 1;
                  const isLastDay = dayIndex === days.length - 1;
                  const roundedClass = isLastTimeSlot && isLastDay ? 'rounded-br-lg' : '';
                  
                  return (
                    <div 
                      key={`${day}-${time}`} 
                      className={`h-20 border-t border-gray-200 dark:border-gray-700 relative ${roundedClass}`}
                    >
                      {classes.map(slot => {
                        const course = getCourseById(slot.courseId);
                        if (!course) return null;
                        
                        const startHour = parseInt(slot.startTime.split(':')[0], 10);
                        const endHour = parseInt(slot.endTime.split(':')[0], 10);
                        const currentHour = parseInt(time.split(':')[0], 10);
                        
                        // Only render the course card at the start hour
                        if (startHour !== currentHour) return null;
                        
                        const duration = endHour - startHour;
                        
                        return (
                          <div 
                            key={slot.id}
                            className="absolute inset-1 rounded-md p-2 shadow-sm flex flex-col justify-between overflow-hidden transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                            style={{ 
                              backgroundColor: `${course.color}30`, // 30% opacity
                              borderLeft: `3px solid ${course.color}` 
                            }}
                          >
                            <div>
                              <p className="font-medium text-sm truncate" style={{ color: course.color }}>
                                {course.name}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                                {course.instructor}
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px]">
                                {course.location}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Timetable;
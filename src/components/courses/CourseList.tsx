import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import Card from '../ui/Card';
import { formatTime, getShortDay } from '../../utils/dateUtils';
import { Book, Users, MapPin, Clock } from 'lucide-react';

const CourseList: React.FC = () => {
  const { courses, timeSlots } = useDashboard();

  // Group time slots by course
  const courseTimeSlots = courses.map(course => {
    const slots = timeSlots.filter(slot => slot.courseId === course.id);
    return {
      ...course,
      slots,
    };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Courses</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseTimeSlots.map(course => (
          <Card
            key={course.id}
            hoverable
            className="transition-all duration-200"
          >
            <div 
              className="h-3 rounded-t-xl -mt-4 -mx-4 mb-3"
              style={{ backgroundColor: course.color }}
            ></div>
            
            <h2 className="text-xl font-bold mb-2">{course.name}</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Users className="h-4 w-4 mr-2" />
                <span>{course.instructor}</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{course.location}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Schedule
              </h3>
              
              {course.slots.length > 0 ? (
                <div className="space-y-2">
                  {course.slots.map(slot => (
                    <div 
                      key={slot.id}
                      className="text-sm bg-gray-50 dark:bg-gray-800/50 rounded-md px-3 py-2 flex justify-between"
                    >
                      <span className="font-medium capitalize">
                        {getShortDay(slot.day)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No scheduled sessions
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-10">
          <div className="text-gray-400 dark:text-gray-500 mb-3">
            <Book className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No courses found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Add your first course to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
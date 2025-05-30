import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { formatDate, getUrgencyLevel, isPastDue } from '../../utils/dateUtils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Book, Calendar, ListChecks, Clock, AlertTriangle } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const { assignments, courses, events } = useDashboard();

  // Get upcoming assignments sorted by due date
  const upcomingAssignments = [...assignments]
    .filter(assignment => assignment.status !== 'completed' && !isPastDue(assignment.dueDate))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  // Get upcoming events
  const upcomingEvents = [...events]
    .filter(event => !isPastDue(event.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Get overdue assignments
  const overdueAssignments = assignments
    .filter(assignment => assignment.status !== 'completed' && isPastDue(assignment.dueDate))
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  // Get course by ID
  const getCourse = (courseId: string) => {
    return courses.find(course => course.id === courseId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-primary-50 dark:bg-primary-900 border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-800 mr-4">
                <Book className="h-6 w-6 text-primary-600 dark:text-primary-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Courses</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-secondary-50 dark:bg-secondary-900 border-l-4 border-secondary-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 dark:bg-secondary-800 mr-4">
                <ListChecks className="h-6 w-6 text-secondary-600 dark:text-secondary-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Assignments</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{assignments.filter(a => a.status !== 'completed').length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-accent-50 dark:bg-accent-900 border-l-4 border-accent-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent-100 dark:bg-accent-800 mr-4">
                <Calendar className="h-6 w-6 text-accent-600 dark:text-accent-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Events</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{upcomingEvents.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className={`${overdueAssignments.length > 0 ? 'bg-error-50 dark:bg-error-900 border-l-4 border-error-500' : 'bg-success-50 dark:bg-success-900 border-l-4 border-success-500'}`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${overdueAssignments.length > 0 ? 'bg-error-100 dark:bg-error-800' : 'bg-success-100 dark:bg-success-800'} mr-4`}>
                {overdueAssignments.length > 0 ? (
                  <AlertTriangle className="h-6 w-6 text-error-600 dark:text-error-300" />
                ) : (
                  <Clock className="h-6 w-6 text-success-600 dark:text-success-300" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Overdue</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{overdueAssignments.length}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Upcoming Assignments</h2>
              <Badge variant="primary">Next 7 Days</Badge>
            </div>
            {upcomingAssignments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAssignments.map(assignment => {
                  const course = getCourse(assignment.courseId);
                  const urgency = getUrgencyLevel(assignment.dueDate);
                  const urgencyMap = {
                    high: 'error',
                    medium: 'warning',
                    low: 'primary',
                    none: 'secondary',
                  };
                  
                  return (
                    <div 
                      key={assignment.id} 
                      className="p-3 rounded-lg bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {course?.name} • {formatDate(assignment.dueDate)}
                          </p>
                        </div>
                        <Badge 
                          variant={urgencyMap[urgency] as 'primary' | 'secondary' | 'success' | 'warning' | 'error'}
                        >
                          {urgency === 'high' ? 'Due Soon' : 
                           urgency === 'medium' ? 'Upcoming' : 'Due Later'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <p>No upcoming assignments!</p>
              </div>
            )}
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Upcoming Events</h2>
              <Badge variant="secondary">Calendar</Badge>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map(event => {
                  const course = event.courseId ? getCourse(event.courseId) : null;
                  const eventTypeColor = {
                    'assignment': 'primary',
                    'exam': 'error',
                    'reminder': 'warning',
                  };
                  
                  return (
                    <div 
                      key={event.id} 
                      className="p-3 rounded-lg bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {course?.name ? `${course.name} • ` : ''}{formatDate(event.date)}
                          </p>
                        </div>
                        <Badge 
                          variant={eventTypeColor[event.type] as 'primary' | 'secondary' | 'success' | 'warning' | 'error'}
                        >
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <p>No upcoming events!</p>
              </div>
            )}
          </Card>
        </div>
      </div>
      
      {overdueAssignments.length > 0 && (
        <Card className="border-l-4 border-error-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <AlertTriangle className="h-5 w-5 text-error-500 mr-2" />
              Overdue Assignments
            </h2>
            <Badge variant="error">{overdueAssignments.length} Tasks</Badge>
          </div>
          <div className="space-y-3">
            {overdueAssignments.slice(0, 3).map(assignment => {
              const course = getCourse(assignment.courseId);
              
              return (
                <div 
                  key={assignment.id} 
                  className="p-3 rounded-lg bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course?.name} • Due {formatDate(assignment.dueDate)}
                      </p>
                    </div>
                    <Badge variant="error">Overdue</Badge>
                  </div>
                </div>
              );
            })}
            {overdueAssignments.length > 3 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                +{overdueAssignments.length - 3} more overdue assignments
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashboardOverview;
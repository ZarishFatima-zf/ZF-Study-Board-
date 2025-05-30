import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { formatDate, getUrgencyLevel, isPastDue } from '../../utils/dateUtils';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ChevronDown, ChevronUp, CheckCircle, Circle, XCircle, Clock, AlertTriangle } from 'lucide-react';

type AssignmentStatus = 'all' | 'todo' | 'in-progress' | 'completed';
type AssignmentPriority = 'all' | 'low' | 'medium' | 'high';

const AssignmentList: React.FC = () => {
  const { assignments, courses, updateAssignment } = useDashboard();
  const [statusFilter, setStatusFilter] = useState<AssignmentStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<AssignmentPriority>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getCourseById = (id: string) => courses.find(course => course.id === id);

  const filteredAssignments = assignments.filter(assignment => {
    if (statusFilter !== 'all' && assignment.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && assignment.priority !== priorityFilter) return false;
    return true;
  });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleToggleStatus = (assignment: typeof assignments[0]) => {
    let newStatus: typeof assignment.status;
    
    if (assignment.status === 'todo') {
      newStatus = 'in-progress';
    } else if (assignment.status === 'in-progress') {
      newStatus = 'completed';
    } else {
      newStatus = 'todo';
    }
    
    updateAssignment({ ...assignment, status: newStatus });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo':
        return <Circle className="h-5 w-5 text-gray-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-warning-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      case 'medium':
        return <Badge variant="primary">Medium Priority</Badge>;
      case 'high':
        return <Badge variant="error">High Priority</Badge>;
      default:
        return <Badge variant="secondary">Low Priority</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Assignments</h1>
        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 text-sm ${
                statusFilter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('todo')}
              className={`px-3 py-1 text-sm ${
                statusFilter === 'todo'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              To Do
            </button>
            <button
              onClick={() => setStatusFilter('in-progress')}
              className={`px-3 py-1 text-sm ${
                statusFilter === 'in-progress'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 text-sm ${
                statusFilter === 'completed'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
          
          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setPriorityFilter('all')}
              className={`px-3 py-1 text-sm ${
                priorityFilter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPriorityFilter('low')}
              className={`px-3 py-1 text-sm ${
                priorityFilter === 'low'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              Low
            </button>
            <button
              onClick={() => setPriorityFilter('medium')}
              className={`px-3 py-1 text-sm ${
                priorityFilter === 'medium'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setPriorityFilter('high')}
              className={`px-3 py-1 text-sm ${
                priorityFilter === 'high'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              High
            </button>
          </div>
          
          <Button
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            variant="ghost"
            icon={sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          >
            {sortDirection === 'asc' ? 'Earliest First' : 'Latest First'}
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedAssignments.length > 0 ? (
          sortedAssignments.map(assignment => {
            const course = getCourseById(assignment.courseId);
            const isOverdue = isPastDue(assignment.dueDate) && assignment.status !== 'completed';
            
            return (
              <Card 
                key={assignment.id} 
                className={`${
                  assignment.status === 'completed' 
                    ? 'border-l-4 border-success-500' 
                    : isOverdue
                      ? 'border-l-4 border-error-500'
                      : 'border-l-4 border-primary-500'
                } hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleStatus(assignment)}
                    className="mt-1 transition-transform duration-200 hover:scale-110"
                  >
                    {getStatusIcon(assignment.status)}
                  </button>
                  
                  <div className="flex-grow">
                    <div className="flex flex-wrap justify-between">
                      <h3 className={`font-medium text-lg ${assignment.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {assignment.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {isOverdue && (
                          <div className="flex items-center gap-1 text-error-500">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">Overdue</span>
                          </div>
                        )}
                        {getPriorityBadge(assignment.priority)}
                      </div>
                    </div>
                    
                    <p className={`text-sm mt-1 ${assignment.status === 'completed' ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
                      {assignment.description}
                    </p>
                    
                    <div className="flex flex-wrap justify-between mt-3">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: course?.color || '#888' }}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {course?.name || 'Unknown Course'}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Due: {formatDate(assignment.dueDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-10">
            <div className="text-gray-400 dark:text-gray-500 mb-3">
              <ClipboardList className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No assignments found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {statusFilter !== 'all' || priorityFilter !== 'all' 
                ? 'Try changing your filters' 
                : 'Create your first assignment to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
import React from 'react';
import { Home, Calendar, BookOpen, ClipboardList, Clock } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'timetable', label: 'Timetable', icon: <Clock className="w-5 h-5" /> },
    { id: 'assignments', label: 'Assignments', icon: <ClipboardList className="w-5 h-5" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <aside className={`fixed top-0 left-0 z-20 h-full pt-16 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-md lg:shadow-none`}>
      <div className="h-full flex flex-col w-64 overflow-y-auto py-4 px-3">
        <nav className="space-y-1 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
         
  
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
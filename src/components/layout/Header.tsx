import React from 'react';
import { Sun, Moon, Menu, X, Bell, Settings } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import Button from '../ui/Button';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, toggleTheme } = useDashboard();

  return (
    <header className="bg-white dark:bg-gray-800 sticky top-0 z-10 shadow-sm px-4 py-2 transition-all duration-200">
      <div className="flex items-center justify-between h-14">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        
        </div>
        <div className="flex items-center space-x-2">
      
         
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={user.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {user.theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { DashboardProvider } from './context/DashboardContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import DashboardOverview from './components/dashboard/DashboardOverview';
import Timetable from './components/timetable/Timetable';
import AssignmentList from './components/assignments/AssignmentList';
import Calendar from './components/calendar/Calendar';
import CourseList from './components/courses/CourseList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'timetable':
        return <Timetable />;
      case 'assignments':
        return <AssignmentList />;
      case 'calendar':
        return <Calendar />;
      case 'courses':
        return <CourseList />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (window.innerWidth < 1024) {
              setIsSidebarOpen(false);
            }
          }} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-4 pb-24 lg:ml-64">
            {renderContent()}
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;
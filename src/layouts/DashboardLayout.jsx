import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden selection:bg-brand-500/30">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col pl-0 lg:pl-72 transition-all duration-300 w-full relative">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        {/* Background decorative elements */}
        <div className="fixed top-0 left-0 lg:left-72 w-full lg:w-[calc(100%-18rem)] h-[500px] bg-gradient-to-b from-brand-50/60 to-transparent pointer-events-none -z-10" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 relative">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

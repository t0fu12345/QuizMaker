import React, { useRef, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import BackToTopButton from '../components/BackToTopButton';
import { getCurrentUser } from '../utils/auth';

const DashboardLayout = () => {
  const scrollContainerRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/auth/login', { state: { from: location } });
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans flex overflow-hidden transition-colors duration-300">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className={`flex-1 flex flex-col h-screen overflow-hidden relative transition-[margin] duration-300 ${isSidebarCollapsed ? 'ml-[80px]' : 'ml-[260px]'}`}>
        <Header />
        <main ref={scrollContainerRef} className="flex-1 overflow-y-auto px-10 pb-10">
          <Outlet />
        </main>
      </div>

      <BackToTopButton scrollContainerRef={scrollContainerRef} />
    </div>
  );
};

export default DashboardLayout;

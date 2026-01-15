import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const handleNavClick = () => setIsMobileOpen(false);

  const navItem = (path, name, icon) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        onClick={handleNavClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 text-sm font-medium ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <span className="text-lg">{icon}</span>
        {name}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden">
      
      {/* 1. SIDEBAR (Desktop: Visible | Mobile: Hidden by default) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0F172A] border-r border-slate-800 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                TNS 2 <span className="text-blue-500">Physics for Engineers</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Calculus Based</p>
            </div>
            {/* Close Button (Mobile Only) */}
            <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
             {navItem('/', 'Home Dashboard', '🏠')}
             <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Modules</div>
             {navItem('/units', '1. Units & Vectors', '📐')}
             {navItem('/motion-1d', '2. 1D & Free Fall', '🏎️')}
             {navItem('/motion-2d', '3. Projectile Motion', '🚀')}
             {navItem('/newton', '4. Newton\'s Laws', '🍎')} {/* NEW */}
          </nav>

          <div className="p-4 border-t border-slate-800">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">JP</div>
                <div>
                  <p className="text-sm text-white">Engr. Profile</p>
                  <p className="text-xs text-slate-500">Licensed CE</p>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Header (Visible only on small screens) */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center flex-shrink-0">
           <h2 className="font-bold text-slate-800">Physics Suite</h2>
           <button onClick={() => setIsMobileOpen(true)} className="text-slate-600 hover:text-blue-600">
             {/* Hamburger Icon */}
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
           </button>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
           <div className="max-w-6xl mx-auto">
              <Outlet />
           </div>
        </main>

        {/* Mobile Overlay (Darkens background when menu is open) */}
        {isMobileOpen && (
          <div 
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          ></div>
        )}
      </div>
    </div>
  );
};

export default Layout;
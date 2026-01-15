import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="space-y-12 pb-10">
      
      {/* 1. HERO SECTION */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Physics for <span className="text-blue-600">Civil Engineers</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            The bridge between theoretical science and practical design. 
            Master the fundamental forces, motions, and laws that govern the built environment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
             <Link to="/units" className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform active:scale-95">
                Start Module 1
             </Link>
             <button className="w-full sm:w-auto px-8 py-3 bg-white text-slate-700 font-bold rounded-lg border border-slate-300 hover:bg-slate-50 transition">
                View Syllabus
             </button>
          </div>
        </div>
      </div>

      {/* 2. DEFINITION & BRANCHES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
         <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Why Engineering Physics?</h2>
            <div className="prose prose-slate text-slate-600">
              <p>
                Physics is the natural science that studies matter, motion, and behavior through space and time.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
                For <strong>Engineers</strong>, it is not abstract theory. It is the toolkit used to ensure bridges don't collapse, circuits don't overheat, and projectiles hit their targets.
              </div>
            </div>
         </div>
         
         {/* BRANCHES GRID */}
         <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Core Disciplines</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <BranchCard title="Classical Mechanics" desc="Motion, Forces, Statics" active />
               <BranchCard title="Thermodynamics" desc="Heat, Work, Efficiency" />
               <BranchCard title="Electromagnetism" desc="Circuits, Fields, Light" />
               <BranchCard title="Fluid Dynamics" desc="Hydraulics, Pressure" />
            </div>
         </div>
      </div>

      {/* 3. MODULE NAVIGATION */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Interactive Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <ModuleCard 
             to="/units"
             icon="📐"
             title="1. Fundamentals"
             desc="Unit conversion, Sig Figs, and Vector resolution."
             color="blue"
           />
           <ModuleCard 
             to="/motion-1d"
             icon="🏎️"
             title="2. Kinematics"
             desc="1D Motion, Free Fall, and Constant Acceleration."
             color="emerald"
           />
           <ModuleCard 
             to="/motion-2d"
             icon="🚀"
             title="3. Projectiles"
             desc="2D Motion, Trajectory, Range, and Height."
             color="orange"
           />
        </div>
      </div>

    </div>
  );
};

const BranchCard = ({ title, desc, active }) => (
  <div className={`p-4 rounded-lg border ${active ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800 border-slate-700'}`}>
     <div className={`font-bold ${active ? 'text-blue-400' : 'text-slate-200'}`}>{title}</div>
     <div className="text-xs text-slate-400 mt-1">{desc}</div>
  </div>
);

const ModuleCard = ({ to, icon, title, desc, color }) => {
  const colors = {
    blue: 'hover:border-blue-500 hover:shadow-blue-100',
    emerald: 'hover:border-emerald-500 hover:shadow-emerald-100',
    orange: 'hover:border-orange-500 hover:shadow-orange-100',
  };
  return (
    <Link to={to} className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${colors[color]} group block`}>
       <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
       <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{title}</h4>
       <p className="text-slate-500 text-sm mt-2 leading-relaxed">{desc}</p>
    </Link>
  );
}

export default Landing;
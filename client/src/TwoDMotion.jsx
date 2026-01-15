import React, { useState } from 'react';
import Latex from 'react-latex-next';
import InputGroup from './components/InputGroup'; 

const TwoDMotion = () => {
  const [vel, setVel] = useState(30);
  const [ang, setAng] = useState(45);
  const [res, setRes] = useState(null);

  const solve = async () => {
    const req = await fetch('http://127.0.0.1:8000/projectile', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ velocity: Number(vel), angle: Number(ang) })
    });
    setRes(await req.json());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* LEFT: THEORY */}
      <div className="lg:col-span-7 space-y-10">
        
        {/* Intro to 2D Motion */}
        <section>
           <h2 className="text-3xl font-bold text-slate-900 mb-3">1. Motion in Two-Dimensions</h2>
           <p className="text-slate-600 mb-4">
             Motion in 2D can be modeled as two independent motions occurring simultaneously: 
             one along the x-axis and one along the y-axis.
           </p>
           <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
               <strong>The Superposition Principle:</strong> The horizontal motion (constant velocity) does not affect the vertical motion (constant acceleration due to gravity), and vice versa. They are only linked by <strong>Time ($t$)</strong>.
           </div>
        </section>

        {/* Projectile Motion */}
        <section>
           <h2 className="text-3xl font-bold text-slate-900 mb-3">2. Projectile Motion</h2>
           <p className="text-slate-600">
             A projectile is an object upon which the only force is gravity. Gravity acts to influence the vertical motion of the projectile, thus causing a vertical acceleration.
           </p>
           
           <div className="my-6 flex justify-center border border-dashed border-slate-300 rounded-xl bg-slate-50 p-6">
                
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Range Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-blue-600 uppercase mb-2">Horizontal Range ($R$)</h4>
                  <p className="text-xs text-slate-500 mb-3">Total horizontal distance covered.</p>
                  <div className="text-lg text-center bg-blue-50 p-3 rounded">
                      <Latex>{`$$R = \\frac{v_0^2 \\sin(2\\theta)}{g}$$`}</Latex>
                  </div>
              </div>

              {/* Height Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold text-emerald-600 uppercase mb-2">Maximum Height ($H$)</h4>
                  <p className="text-xs text-slate-500 mb-3">Peak vertical position.</p>
                  <div className="text-lg text-center bg-emerald-50 p-3 rounded">
                      <Latex>{`$$H = \\frac{v_0^2 \\sin^2(\\theta)}{2g}$$`}</Latex>
                  </div>
              </div>
           </div>
        </section>
      </div>

      {/* RIGHT: CALCULATOR */}
      <div className="lg:col-span-5 sticky top-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-white">Projectile Solver</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <InputGroup label="Initial Velocity" symbol="v_0" value={vel} onChange={setVel} unit="m/s" />
            <InputGroup label="Launch Angle" symbol="\theta" value={ang} onChange={setAng} unit="deg" />

            <button onClick={solve} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
              Calculate Trajectory
            </button>
          </div>

          {res && (
             <div className="bg-slate-900 text-white p-6">
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-sm">Total Range</span>
                      <span className="text-xl font-bold font-mono text-blue-400">{res.range} m</span>
                   </div>
                   <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-slate-400 text-sm">Max Height</span>
                      <span className="text-xl font-bold font-mono text-emerald-400">{res.height} m</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Time of Flight</span>
                      <span className="text-xl font-bold font-mono text-yellow-400">{res.time} s</span>
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoDMotion;
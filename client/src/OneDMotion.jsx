import React, { useState } from 'react';
import Latex from 'react-latex-next';
import InputGroup from './components/InputGroup'; 

const OneDMotion = () => {
  const [mode, setMode] = useState('constant_accel');
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [val3, setVal3] = useState(0);
  const [res, setRes] = useState(null);

  const solve = async () => {
    const payload = { type: mode, val1: Number(val1), val2: Number(val2), val3: Number(val3) };
    const req = await fetch('http://127.0.0.1:8000/motion1d', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });
    setRes(await req.json());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* LEFT: THEORY */}
      <div className="lg:col-span-7 space-y-10">
        
        {/* Topic: Constant Acceleration */}
        <section>
           <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Particle Under Constant Acceleration</h2>
           <p className="text-slate-600 mb-4">
             When acceleration is constant (non-zero), velocity changes linearly with time, and position changes quadratically. 
             These are the famous <strong>Kinematic Equations</strong>.
           </p>
           
           <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                       <span className="text-xs font-bold text-slate-400 uppercase">Velocity-Time</span>
                       <div className="mt-1"><Latex>{`$$v_f = v_i + at$$`}</Latex></div>
                   </div>
                   <div>
                       <span className="text-xs font-bold text-slate-400 uppercase">Position-Time</span>
                       <div className="mt-1"><Latex>{`$$x_f = x_i + v_i t + \\frac{1}{2}at^2$$`}</Latex></div>
                   </div>
               </div>
           </div>
        </section>

        {/* Topic: Free Fall */}
        <section>
           <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Free Falling Objects</h2>
           <div className="prose prose-slate text-slate-600">
               <p>
                   A free-falling object is any object moving freely under the influence of gravity alone, regardless of its initial motion. 
                   We neglect air resistance.
               </p>
               <ul className="list-disc pl-5">
                   <li>Acceleration is always directed downward.</li>
                   <li>Magnitude <Latex>{`$g = 9.81 \\text{ m/s}^2$`}</Latex>.</li>
                   <li>At the peak of a throw, velocity is zero.</li>
               </ul>
           </div>

            

[Image of free fall velocity vs time graph]

        </section>
      </div>

      {/* RIGHT: CALCULATOR */}
      <div className="lg:col-span-5 sticky top-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 text-white p-4">
              <h3 className="font-bold">1D Motion Solver</h3>
              <select 
                className="mt-2 w-full bg-slate-800 border border-slate-700 text-white text-sm rounded p-2"
                onChange={(e) => {setMode(e.target.value); setRes(null);}}
              >
                  <option value="constant_accel">Constant Accel (Find Final Velocity)</option>
                  <option value="displacement_accel">Constant Accel (Find Displacement)</option>
                  <option value="freefall_time">Free Fall (Find Distance by Time)</option>
                  <option value="freefall_velocity">Free Fall (Find Speed by Time)</option>
              </select>
          </div>

          <div className="p-6 space-y-4">
            {/* Dynamic Inputs based on Selection */}
            {(mode === 'constant_accel' || mode === 'displacement_accel') && (
                <>
                    <InputGroup label="Initial Velocity" symbol="v_i" value={val1} onChange={setVal1} unit="m/s" />
                    <InputGroup label="Time" symbol="t" value={val2} onChange={setVal2} unit="s" />
                    <InputGroup label="Acceleration" symbol="a" value={val3} onChange={setVal3} unit="m/s²" />
                </>
            )}

            {(mode === 'freefall_time' || mode === 'freefall_velocity') && (
                <>
                    <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-800 mb-2">
                        Assumes object dropped from rest ($v_i = 0$). Gravity ($g=9.81$) applied automatically.
                    </div>
                    <InputGroup label="Time Falling" symbol="t" value={val1} onChange={setVal1} unit="s" />
                </>
            )}

            <button onClick={solve} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4">
                Calculate
            </button>

            {res && (
                 <div className="mt-4 p-4 bg-slate-100 border border-slate-200 rounded text-center">
                     <div className="text-xs font-bold text-slate-500 uppercase">{res.label}</div>
                     <div className="text-2xl font-bold text-blue-600 mt-1">{res.result} {res.unit}</div>
                 </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneDMotion;
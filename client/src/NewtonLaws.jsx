import React, { useState } from 'react';
import Latex from 'react-latex-next';
import InputGroup from './components/InputGroup'; 

const NewtonLaws = () => {
  const [mode, setMode] = useState('second_law');
  const [mass, setMass] = useState(10);
  const [val2, setVal2] = useState(0); // Acceleration or Friction Coeff
  const [res, setRes] = useState(null);

  const solve = async () => {
    const payload = { type: mode, mass: Number(mass), val2: Number(val2) };
    const req = await fetch('http://127.0.0.1:8000/newton', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });
    setRes(await req.json());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* LEFT: THEORY */}
      <div className="lg:col-span-7 space-y-10">
        
        {/* 1st Law */}
        <section>
           <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Newton's First Law (Inertia)</h2>
           <div className="prose prose-slate text-slate-600">
               <p>
                 "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force."
               </p>
               <div className="bg-slate-50 border-l-4 border-slate-400 p-4 my-2 text-sm">
                 <strong>Inertia</strong> is the resistance of an object to any change in its motion. It is directly proportional to <strong>Mass</strong>.
               </div>
           </div>
        </section>

        {/* 2nd Law & Mass */}
        <section>
           <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Newton's Second Law</h2>
           <p className="text-slate-600 mb-4">
             The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.
           </p>
           
           <div className="flex justify-center my-4 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-2xl font-bold text-blue-900"><Latex>{`$$\\sum F = ma$$`}</Latex></div>
           </div>

           <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-white border rounded shadow-sm">
                 <strong>Mass ($kg$):</strong> A measure of the amount of matter in an object. Constant everywhere.
              </div>
              <div className="p-3 bg-white border rounded shadow-sm">
                 <strong>Weight ($N$):</strong> The force of gravity on an object. Changes with location. <Latex>$W = mg$</Latex>.
              </div>
           </div>
        </section>

        {/* 3rd Law */}
        <section>
           <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Newton's Third Law</h2>
           <p className="text-slate-600">
             "For every action, there is an equal and opposite reaction."
           </p>
           <div className="mt-4 flex justify-center border border-dashed border-slate-300 rounded-xl bg-slate-50 p-4 text-slate-400 text-sm">
              
           </div>
        </section>

        {/* Friction */}
        <section>
           <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Forces of Friction</h2>
           <p className="text-slate-600 mb-2">
             Friction is a resistive force that opposes motion.
           </p>
           <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li><strong>Static Friction (<Latex>$f_s$</Latex>):</strong> Prevents motion. Up to a max value.</li>
              <li><strong>Kinetic Friction (<Latex>$f_k$</Latex>):</strong> Opposes moving objects. Constant.</li>
           </ul>
           <div className="text-center py-2 mt-2 bg-slate-100 rounded border"><Latex>{`$$f = \\mu N$$`}</Latex></div>
        </section>
      </div>

      {/* RIGHT: CALCULATOR */}
      <div className="lg:col-span-5 sticky top-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 text-white p-4">
              <h3 className="font-bold">Dynamics Solver</h3>
              <select 
                className="mt-2 w-full bg-slate-800 border border-slate-700 text-white text-sm rounded p-2"
                onChange={(e) => {setMode(e.target.value); setRes(null); setVal2(0);}}
              >
                  <option value="second_law">Find Net Force (F = ma)</option>
                  <option value="weight">Find Weight (W = mg)</option>
                  <option value="friction">Find Friction (f = μN)</option>
              </select>
          </div>

          <div className="p-6 space-y-4">
            <InputGroup label="Mass" symbol="m" value={mass} onChange={setMass} unit="kg" />

            {mode === 'second_law' && (
               <InputGroup label="Acceleration" symbol="a" value={val2} onChange={setVal2} unit="m/s²" />
            )}

            {mode === 'friction' && (
               <InputGroup label="Coefficient of Friction" symbol="\mu" value={val2} onChange={setVal2} unit="--" />
            )}

            <button onClick={solve} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4">
                Calculate
            </button>

            {res && (
                 <div className="mt-4 p-4 bg-slate-900 text-white rounded text-center">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{res.label}</div>
                     <div className="text-3xl font-bold text-blue-400 mt-2 font-mono">{res.result} {res.unit}</div>
                 </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewtonLaws;
import React, { useState } from 'react';
import Latex from 'react-latex-next';
import InputGroup from './components/InputGroup'; 

const UnitsVectors = () => {
  // --- State for Calculator ---
  const [calcMode, setCalcMode] = useState('vector'); // 'vector' or 'convert'
  
  // Vector State
  const [fx, setFx] = useState(10);
  const [fy, setFy] = useState(15);
  const [vecRes, setVecRes] = useState(null);

  // Converter State
  const [convVal, setConvVal] = useState(1);
  const [unitFrom, setUnitFrom] = useState('m');
  const [unitTo, setUnitTo] = useState('ft');
  const [convRes, setConvRes] = useState(null);

  // --- Handlers ---
  const solveVector = async () => {
    const res = await fetch('http://127.0.0.1:8000/vectors', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ fx: Number(fx), fy: Number(fy) })
    });
    setVecRes(await res.json());
  };

  const solveConvert = async () => {
    const res = await fetch('http://127.0.0.1:8000/convert', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ value: Number(convVal), from_unit: unitFrom, to_unit: unitTo })
    });
    setConvRes(await res.json());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* LEFT: THEORY CONTENT */}
      <div className="lg:col-span-7 space-y-10">
        
        {/* Section 1: Units */}
        <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Unit Measures</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                    <strong>Measurement</strong> is the comparison of an unknown quantity with a standard. 
                    In engineering, we strictly follow the <strong>SI (Système International)</strong> units, 
                    though conversion to Imperial (English) units is often required in the field.
                </p>
                <div className="bg-white border-l-4 border-blue-500 p-4 my-4 shadow-sm">
                    <strong>Significant Figures:</strong> The precision of a measurement is limited by the instrument. 
                    Calculated results should never be more precise than the least precise input.
                </div>
            </div>
        </section>

        {/* Section 2: Scalars vs Vectors */}
        <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Scalars & Vectors</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-100 p-5 rounded-lg">
                    <h3 className="font-bold text-slate-800 mb-2">Scalar Quantities</h3>
                    <p className="text-sm text-slate-600">Defined by <strong>Magnitude</strong> only.</p>
                    <ul className="text-sm list-disc ml-4 mt-2 text-slate-500">
                        <li>Mass, Time, Temp</li>
                        <li>Distance, Speed</li>
                    </ul>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-2">Vector Quantities</h3>
                    <p className="text-sm text-blue-600">Defined by <strong>Magnitude + Direction</strong>.</p>
                    <ul className="text-sm list-disc ml-4 mt-2 text-blue-500">
                        <li>Force, Velocity</li>
                        <li>Displacement, Accel</li>
                    </ul>
                </div>
            </div>
            
            

[Image of distance vs displacement comparison]

        </section>

        {/* Section 3: Fundamental Rule */}
        <section>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Fundamental Rule of Vectors</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
                <p>
                    Vectors follow the <strong>Parallelogram Law</strong> for addition. When adding vectors <Latex>$A$</Latex> and <Latex>$B$</Latex>,
                    the resultant <Latex>$R$</Latex> is the diagonal of the parallelogram formed by them.
                </p>
                
                

[Image of vector addition parallelogram law]


                <div className="flex gap-4 mt-4">
                    <div className="flex-1 bg-white p-4 border rounded shadow-sm">
                        <span className="text-xs font-bold uppercase text-slate-400">Magnitude Formula</span>
                        <div className="mt-2"><Latex>{`$$|R| = \\sqrt{R_x^2 + R_y^2}$$`}</Latex></div>
                    </div>
                </div>
            </div>
        </section>
      </div>

      {/* RIGHT: MULTI-TOOL CALCULATOR */}
      <div className="lg:col-span-5 sticky top-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button 
                onClick={() => setCalcMode('vector')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${calcMode==='vector' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
                Vector Solver
            </button>
            <button 
                onClick={() => setCalcMode('convert')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${calcMode==='convert' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
                Unit Converter
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {calcMode === 'vector' ? (
                <>
                    <InputGroup label="X-Component" symbol="F_x" value={fx} onChange={setFx} unit="units" />
                    <InputGroup label="Y-Component" symbol="F_y" value={fy} onChange={setFy} unit="units" />
                    <button onClick={solveVector} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Calculate Resultant</button>
                    {vecRes && (
                        <div className="bg-slate-900 text-white p-4 rounded-lg text-center mt-4">
                            <p>Mag: <span className="text-blue-400 font-mono text-xl">{vecRes.magnitude}</span></p>
                            <p>Angle: <span className="text-emerald-400 font-mono text-xl">{vecRes.angle}°</span></p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <InputGroup label="Value to Convert" symbol="x" value={convVal} onChange={setConvVal} unit={unitFrom} />
                    <div className="grid grid-cols-2 gap-4">
                        <select value={unitFrom} onChange={e=>setUnitFrom(e.target.value)} className="p-2 border rounded">
                            <option value="m">Meters (m)</option>
                            <option value="km">Kilometers (km)</option>
                            <option value="ft">Feet (ft)</option>
                            <option value="in">Inches (in)</option>
                        </select>
                        <select value={unitTo} onChange={e=>setUnitTo(e.target.value)} className="p-2 border rounded">
                            <option value="m">Meters (m)</option>
                            <option value="km">Kilometers (km)</option>
                            <option value="ft">Feet (ft)</option>
                            <option value="in">Inches (in)</option>
                        </select>
                    </div>
                    <button onClick={solveConvert} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Convert</button>
                    {convRes && (
                        <div className="bg-slate-900 text-white p-4 rounded-lg text-center mt-4">
                            <span className="text-2xl font-mono text-yellow-400">{convRes.result} {convRes.unit}</span>
                        </div>
                    )}
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsVectors;
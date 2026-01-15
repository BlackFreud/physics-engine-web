import React from 'react';
import Latex from 'react-latex-next';

const InputGroup = ({ label, symbol, value, onChange, unit }) => {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
        {label} (<Latex>{`$${symbol}$`}</Latex>)
      </label>
      <div className="relative group">
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-mono text-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
        />
        <span className="absolute right-4 top-3.5 text-slate-400 font-bold text-sm select-none">
          {unit}
        </span>
      </div>
    </div>
  );
};

export default InputGroup;
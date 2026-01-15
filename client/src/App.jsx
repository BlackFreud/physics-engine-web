import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Landing from './Landing'; // Import the new page
import UnitsVectors from './UnitsVectors';
import OneDMotion from './OneDMotion';
import TwoDMotion from './TwoDMotion';
import NewtonLaws from './NewtonLaws'; // Import the file

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* LANDING PAGE (New Home) */}
          <Route index element={<Landing />} />
          
          {/* Module 1: Moved to explicit path */}
          <Route path="units" element={<UnitsVectors />} />
          
          {/* Module 2 */}
          <Route path="motion-1d" element={<OneDMotion />} />
          
          {/* Module 3 */}
          <Route path="motion-2d" element={<TwoDMotion />} />

          {/* Module 4: Newton's Laws */}
          <Route path="newton" element={<NewtonLaws />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
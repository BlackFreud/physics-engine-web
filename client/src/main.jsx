import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// IMPORTING THE CSS IS MANDATORY FOR STYLES TO WORK:
import './index.css' 
import 'katex/dist/katex.min.css'; // For the math symbols

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
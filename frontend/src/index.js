import React from 'react';
import ReactDOM from 'react-dom/client';
import './ui/theme.css';
import './index.css';
import App from './App';

const theme = localStorage.getItem('vs-theme') || 'dark';
document.documentElement.setAttribute('data-theme', theme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

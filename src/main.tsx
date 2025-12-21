import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './PomodoroApp.js';
import './assets/css/styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

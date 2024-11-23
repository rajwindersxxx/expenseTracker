import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './components/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);


// future goal add charts and polish ui
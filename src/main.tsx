
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api';

// Initialize backend server when running in development mode
if (import.meta.env.DEV) {
  // Dynamic import for the server to avoid issues in the browser
  import('./backend/server.ts')
    .then(() => console.log('Backend server started'))
    .catch(err => console.error('Failed to start backend server:', err));
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);

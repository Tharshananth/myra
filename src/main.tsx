import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simple routing logic
const renderApp = () => {
  const path = window.location.pathname;
  
  if (path === '/cart') {
    // If on cart page, App will handle showing the Cart component
    return <App />;
  } else {
    // Default home page
    return <App />;
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {renderApp()}
  </StrictMode>
);

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {renderApp()}
    </StrictMode>
  );
});
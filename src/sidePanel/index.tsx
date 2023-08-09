import ReactDOM from 'react-dom/client';
import App from './components/App';
import React from 'react';

ReactDOM.createRoot(
  document.getElementById('hight-side-panel') as HTMLElement,
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

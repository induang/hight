import React from 'react';
import ReactDOM from 'react-dom/client';
import HoverTool from './HoverTool';

function attachHoverTool() {
  const hoverToolRoot = document.createElement('div');
  hoverToolRoot.setAttribute('id', 'hover-tool-root');

  document.body.appendChild(hoverToolRoot);

  ReactDOM.createRoot(
    document.getElementById('hover-tool-root') as HTMLElement,
  ).render(
    <React.StrictMode>
      <HoverTool />
    </React.StrictMode>,
  );
}

export default attachHoverTool;

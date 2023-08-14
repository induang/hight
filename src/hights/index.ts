import * as api from './api';
import { loadAll as loadAllHight } from './operations';
import { initializeHoverTools } from './hoverTool';
import { initializeHighterCursor } from './hightCursor';
// import attachHoverTool from './hover-react';

initializeHoverTools();
// attachHoverTool();
initializeHighterCursor();
window['highterAPI'] = api;
loadAllHight();

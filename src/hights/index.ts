import * as api from './api';
import { loadAll as loadAllHight } from './operations';
import { initializeHoverTools } from './hoverTool';
import { initializeHighterCursor } from './hightCursor';

initializeHoverTools();
initializeHighterCursor();
window['highterAPI'] = api;
loadAllHight();

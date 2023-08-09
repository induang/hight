import * as api from './api';
import { loadAll as loadAllHight } from './operations';
import { initializeHoverTools } from './hover';
// import attachHoverTool from './hover-react';

initializeHoverTools();
// attachHoverTool();
window['highterAPI'] = api;
// chrome.storage.local.clear();
loadAllHight();

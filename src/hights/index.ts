import * as api from './api';
import { loadAll as loadAllHight } from './operations';
import { initializeHoverTools } from './hover';

initializeHoverTools();
window['highterAPI'] = api;
loadAllHight();

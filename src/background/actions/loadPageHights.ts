import { executeInTab } from '../utils';

function loadPageHights(tabId: number) {
  function contentScriptLoadPageHights() {
    if (typeof window.highterAPI.hights.loadAll === 'function') {
      window.highterAPI.hights.loadAll();
    }
  }

  executeInTab(tabId, { func: contentScriptLoadPageHights });
}

export default loadPageHights;

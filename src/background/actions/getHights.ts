import { executeInCurrentTab } from '../utils';

function getHights() {
  function contentScriptGetHights() {
    const hightsMap = window.highterAPI.hights.getAllFound();

    return Array.from(hightsMap);
  }

  return executeInCurrentTab({ func: contentScriptGetHights });
}

export default getHights;

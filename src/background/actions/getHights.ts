import { executeInCurrentTab } from '../utils';

function getHights() {
  function contentScriptGetHights() {
    const hightsMap = window.highterAPI.hights.getAllFound();
    if (hightsMap) {
      return Array.from(hightsMap, ([key, value]) => ({
        hightIndex: key,
        hightText: value,
        // hightParent: value.other
      }));
    } else return null;
  }

  return executeInCurrentTab({ func: contentScriptGetHights });
}

export default getHights;

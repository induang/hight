import { executeInCurrentTab } from '../utils';

function removeHights() {
  function contentScriptRemoveHights() {
    window.highterAPI.hights.deleteAll();
  }

  executeInCurrentTab({ func: contentScriptRemoveHights });
}

export default removeHights;

import { trackEvent } from '../analytics';
import { executeInCurrentTab } from '../utils';

function removeHights() {
  trackEvent('hight-action', 'clear-all');

  function contentScriptRemoveHights() {
    window.highterAPI.hights.deleteAll();
  }

  executeInCurrentTab({ func: contentScriptRemoveHights });
}

export default removeHights;

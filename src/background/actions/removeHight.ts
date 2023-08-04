import { trackEvent } from '../analytics';
import { executeInCurrentTab } from '../utils';

function removeHight(hightId: string | number) {
  trackEvent('hight-action', 'remove-hight');

  function contentScriptRemoveHight(hightIndex: number) {
    window.highterAPI.hight.removeLost(hightIndex);
  }

  executeInCurrentTab({ func: contentScriptRemoveHight, args: [hightId] });
}

export default removeHight;

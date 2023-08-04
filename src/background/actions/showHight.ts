import { trackEvent } from '../analytics';
import { executeInCurrentTab } from '../utils';

function showHight(hightId: number | string) {
  trackEvent('hight-action', 'show-hight');

  function contentScriptShowHight(hightId: number | string) {
    window.highterAPI.hight.show(hightId);
  }

  executeInCurrentTab({ func: contentScriptShowHight, args: [hightId] });
}

export default showHight;

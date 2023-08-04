import getCurrentColor from './getCurrentColor';

import { trackEvent } from '../analytics';
import { executeInCurrentTab } from '../utils';

async function hightText() {
  trackEvent('hight-action', 'hight');

  function contentScriptHightText(currentColor) {
    window.highterAPI.hight.create(currentColor);
  }

  const currentColor = await getCurrentColor();
  executeInCurrentTab({ func: contentScriptHightText, args: [currentColor] });
}

export default hightText;

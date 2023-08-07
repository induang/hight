import getCurrentColor from './getCurrentColor';

import { trackEvent } from '../analytics';
import { executeInCurrentTab } from '../utils';
import { ColorModel } from '../../utils/hight.type';

async function hightText() {
  trackEvent('hight-action', 'hight');

  function contentScriptHightText(currentColor: ColorModel) {
    window.highterAPI.hight.create(currentColor);
  }

  const currentColor = await getCurrentColor();
  executeInCurrentTab({ func: contentScriptHightText, args: [currentColor] });
}

export default hightText;

import getCurrentColor from './getCurrentColor';

import { executeInCurrentTab } from '../utils';
import { ColorModel } from '../../utils/hight.type';

async function hightText() {
  function contentScriptHightText(currentColor: ColorModel) {
    window.highterAPI.hight.create(currentColor);
  }

  const currentColor = await getCurrentColor();
  executeInCurrentTab({ func: contentScriptHightText, args: [currentColor] });
}

export default hightText;

import { executeInCurrentTab } from '../utils';
import { ColorModel } from '../../utils/hight.type';
import getPreLevel from './getPreLevel';
import getColorTheme from './getColorTheme';

async function hightText() {
  function contentScriptHightText(
    currentColor: ColorModel,
    currentLevel: number,
  ) {
    window.highterAPI.hight.create(currentColor, currentLevel);
  }

  const currentLevel = await getPreLevel();
  const currentColor = (await getColorTheme()).colors[currentLevel - 1].color;
  console.log('current color:', currentColor);
  executeInCurrentTab({
    func: contentScriptHightText,
    args: [{ color: currentColor }, currentLevel],
  });
}

export default hightText;

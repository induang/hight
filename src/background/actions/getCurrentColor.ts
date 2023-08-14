import getColorOptions from './getColorOptions';
import { DEFAULT_COLOR_TITLE } from '../utils/constants';
import { ColorModel } from '../../utils/hight.type';

async function getCurrentColor(): Promise<ColorModel> {
  const { color } = await chrome.storage.sync.get('color');
  const colorTitle = color || DEFAULT_COLOR_TITLE;
  const colorOptions: Array<ColorModel> = await getColorOptions();
  return (
    colorOptions.find((colorOption) => colorOption.title === colorTitle) ??
    colorOptions[0]
  );
}

export default getCurrentColor;

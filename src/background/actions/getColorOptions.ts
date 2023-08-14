import { DEFAULT_COLORS } from '../utils/constants';
import { ColorModel } from '../../utils/hight.type';

function getColorOptions(): Promise<Array<ColorModel>> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      {
        colors: DEFAULT_COLORS,
      },
      ({ colors }) => resolve(colors),
    );
  });
}

export default getColorOptions;

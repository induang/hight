import getColorOptions from './getColorOptions';

import { ColorOptionModel } from '../../utils/hight.type';

async function editColor(
  colorTitle: string,
  color: string,
  textColor: string,
): Promise<void> {
  const colorOptions: Array<ColorOptionModel> = await getColorOptions();
  const colorOption = colorOptions.find(
    (option) => option.title === colorTitle,
  )!;
  colorOption.color = color;
  colorOption.textColor = textColor;

  if (!textColor) {
    delete colorOption.textColor;
  }

  chrome.storage.sync.set({ colors: colorOptions });
}

export default editColor;

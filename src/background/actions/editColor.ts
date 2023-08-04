import getColorOptions from './getColorOptions';

import { trackEvent } from '../analytics';

async function editColor(colorTitle: string, color: string, textColor: string) {
  trackEvent('color-edit', colorTitle);

  const colorOptions = await getColorOptions();
  const colorOption = colorOptions.find(
    (option) => option.title === colorTitle,
  );
  colorOption.color = color;
  colorOption.textColor = textColor;

  if (!textColor) {
    delete colorOption.textColor;
  }

  chrome.storage.sync.set({ colors: colorOptions });
}

export default editColor;

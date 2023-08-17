import { ColorThemeModel, DEFAULT_COLOR_THEMES } from '../utils/constants';

export default async function getColorTheme(): Promise<ColorThemeModel> {
  const { currentColorTheme } = await chrome.storage.sync.get({
    currentColorTheme: DEFAULT_COLOR_THEMES[0],
  });
  console.log('get theme: ', currentColorTheme);
  return currentColorTheme;
}

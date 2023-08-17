import { DEFAULT_COLOR_THEMES } from '../utils/constants';

export default async function selectColorTheme(theme: string) {
  const selectedTheme = DEFAULT_COLOR_THEMES.filter(
    (item) => item.name === theme,
  )[0];
  await chrome.storage.sync.set({ currentColorTheme: selectedTheme });
}

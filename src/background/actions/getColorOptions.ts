import { DEFAULT_COLORS } from '../utils/constants';

function getColorOptions() {
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

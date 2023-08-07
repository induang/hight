import { trackEvent } from '../analytics';

function changeColor(colorTitle: string): void {
  if (!colorTitle) return;
  trackEvent('color-changed-to', colorTitle);
  chrome.storage.sync.get({ color: colorTitle });

  chrome.contextMenus.update(colorTitle, { checked: true });
}

export default changeColor;

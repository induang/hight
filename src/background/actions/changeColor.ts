function changeColor(colorTitle: string): void {
  if (!colorTitle) return;
  chrome.storage.sync.get({ color: colorTitle });

  chrome.contextMenus.update(colorTitle, { checked: true });
}

export default changeColor;

let showHighterCursor = false;

function hightOnSelection() {
  if (!showHighterCursor) return;

  const selection = window.getSelection();
  const selectionString = selection?.toString();

  if (selectionString) {
    chrome.runtime.sendMessage({ action: 'hight' });
  }
}

function initializeHighterCursor() {
  document.addEventListener('mouseup', hightOnSelection);
}

function toggleHighterCursor() {
  showHighterCursor = !showHighterCursor;

  if (showHighterCursor) {
    document.body.style.cursor = `url(${chrome.runtime.getURL(
      '/assets/images/highlighter_cursor.png',
    )}), auto`;

    hightOnSelection();
  } else {
    document.body.style.cursor = 'default';
  }
}

export { initializeHighterCursor, toggleHighterCursor };

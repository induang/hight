import {
  changeColor,
  editColor,
  getColorOptions,
  getCurrentColor,
  getHights,
  getLostHights,
  hightText,
  loadPageHights,
  removeHight,
  removeHights,
  showHight,
  toggleHighterCursor,
} from './actions';
import { wrapResponse } from './utils';

function initialize() {
  initializeContextMenus();
  initializeContextMenuEventListeners();
  initializeExtensionEventListeners();
  initializeTabEventListeners();
  initializeKeyboardShortcutEventListeners();
  initializeMessageEventListeners();
}

function initializeContextMenus() {
  chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
      title: 'Hight',
      id: 'hight',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      title: 'Hight color',
      id: 'hight-colors',
    });

    chrome.contextMenus.create({
      title: 'Yellow',
      id: 'yellow',
      parentId: 'hight-colors',
      type: 'radio',
    });
    chrome.contextMenus.create({
      title: 'Blue',
      id: 'blue',
      parentId: 'hight-colors',
      type: 'radio',
    });
    chrome.contextMenus.create({
      title: 'Green',
      id: 'green',
      parentId: 'hight-colors',
      type: 'radio',
    });
    chrome.contextMenus.create({
      title: 'Pink',
      id: 'pink',
      parentId: 'hight-colors',
      type: 'radio',
    });
    chrome.contextMenus.create({
      title: 'Dark',
      id: 'dark',
      parentId: 'hight-colors',
      type: 'radio',
    });

    const { title: colorTitle } = await getCurrentColor();
    chrome.contextMenus.update(colorTitle, { checked: true });
  });
}

function initializeContextMenuEventListeners() {
  chrome.contextMenus.onClicked.addListener(
    ({ menuItemId, parentMenuItemId }) => {
      if (parentMenuItemId === 'hight-color') {
        changeColor(String(menuItemId));
        return;
      }

      switch (menuItemId) {
        case 'hight':
          hightText();
          break;
        case 'toggle-cursor':
          toggleHighterCursor();
      }
    },
  );
}

function initializeExtensionEventListeners() {
  chrome.runtime.onInstalled.addListener(() => {});
  chrome.runtime.onStartup.addListener(() => {});
}

function initializeTabEventListeners() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.url) {
      loadPageHights(tabId);
    }
  });
}

function initializeKeyboardShortcutEventListeners() {
  chrome.commands.onCommand.addListener((command) => {
    switch (command) {
      case 'execute-hight':
        hightText();
        break;
      case 'toggle-highter-cursor':
        toggleHighterCursor();
        break;
      case 'change-color-to-yellow':
        changeColor('yellow');
        break;
      case 'change-color-to-cyan':
        changeColor('cyan');
        break;
      case 'change-color-to-lime':
        changeColor('lime');
        break;
      case 'change-color-to-magenta':
        changeColor('magenta');
        break;
      case 'change-color-to-dark':
        changeColor('dark');
        break;
    }
  });
}
function initializeMessageEventListeners() {
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (!request.action) return;
    switch (request.action) {
      case 'hight':
        hightText();
        return;
      case 'track-event':
        return;
      case 'remove-hights':
        removeHights();
        return;
      case 'remove-hight':
        removeHight(request.hightId);
        return;
      case 'change-color':
        changeColor(request.color);
        return;
      case 'edit-color':
        editColor(request.colorTitle, request.color, request.textColor);
        return;
      case 'toggle-highter-cursor':
        toggleHighterCursor();
      case 'get-hights':
        wrapResponse(getHights(), sendResponse);
        return true;
      // case 'get-leveled-hights':
      //   wrapResponse(getLeveledHights(), sendResponse);
      //   return;
      case 'get-lost-hights':
        wrapResponse(getLostHights(), sendResponse);
        return true;
      case 'show-hight':
        return showHight(request.hightId);
      case 'get-current-color':
        wrapResponse(getCurrentColor(), sendResponse);
        return true;
      case 'get-color-options':
        wrapResponse(getColorOptions(), sendResponse);
        return true;
    }
  });
}

export default initialize;

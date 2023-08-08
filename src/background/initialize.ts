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
} from './actions';
import { trackEvent } from './analytics';
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
        trackEvent('color-change-source', 'context-menu');
        changeColor(String(menuItemId));
        return;
      }

      switch (menuItemId) {
        case 'hight':
          trackEvent('hight-source', 'context-menu');
          hightText();
          break;
      }
    },
  );
}

function initializeExtensionEventListeners() {
  chrome.runtime.onInstalled.addListener(() => {
    trackEvent(
      'extension',
      'installed',
      chrome.runtime.getManifest().version,
      undefined,
      {},
    );
  });
  chrome.runtime.onStartup.addListener(() => {
    trackEvent('extension', 'startup', undefined, undefined, {});
  });
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
        trackEvent('hight-source', 'keyboard-shortcut');
        hightText();
        break;
      case 'change-color-to-yellow':
        trackEvent('color-change-source', 'keyboard-shortcut');
        changeColor('yellow');
        break;
      case 'change-color-to-cyan':
        trackEvent('color-change-source', 'keyboard-shortcut');
        changeColor('cyan');
        break;
      case 'change-color-to-lime':
        trackEvent('color-change-source', 'keyboard-shortcut');
        changeColor('lime');
        break;
      case 'change-color-to-magenta':
        trackEvent('color-change-source', 'keyboard-shortcut');
        changeColor('magenta');
        break;
      case 'change-color-to-dark':
        trackEvent('color-change-source', 'keyboard-shortcut');
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
        trackEvent('hight-source', 'hight-cursor');
        hightText();
        return;
      case 'track-event':
        trackEvent(request.trackCategory, request.trackAction);
        return;
      case 'remove-hights':
        removeHights();
        return;
      case 'remove-hight':
        removeHight(request.hightId);
        return;
      case 'change-color':
        trackEvent('color-change-source', request.source);
        changeColor(request.color);
        return;
      case 'edit-color':
        editColor(request.colorTitle, request.color, request.textColor);
        return;
      case 'get-hights':
        wrapResponse(getHights(), sendResponse);
        return true;
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

import { CUSTOM_HIGHT_DATA_ID, HIGHTED_CLASS } from '../utils/constants';
import {
  updateColor as updateHightColor,
  remove as removeHight,
} from '../core';
import { ChromeMessage } from '../../utils/hight.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let hoverToolEl: any;
let hoverToolTimeout: NodeJS.Timeout;
let currentHightEl: Element;
let hightClicked: boolean;
let copyBTNEl = null;
let changeColorBtnEl = null;
let deleteBTNEl = null;

function initializeHoverTools() {
  $.get(chrome.runtime.getURL('src/hights/hover/index.html'), (data) => {
    hoverToolEl = $(data);
    // hoverToolEl.hide();
    hoverToolEl[0].addEventListener('mouseenter', onHoverToolMouseEnter);
    hoverToolEl[0].addEventListener('mouseleave', onHoverToolMouseLeave);

    copyBTNEl = hoverToolEl.find('.hight-copy-button')[0];
    deleteBTNEl = hoverToolEl.find('.hight-delete-button')[0];
    changeColorBtnEl = hoverToolEl.find('.hight-colorChange-button')[0];

    copyBTNEl.addEventListener('click', onCopyBTNClicked);
    deleteBTNEl.addEventListener('click', onDeleteBTNClicked);
    changeColorBtnEl.addEventListener('click', onChangeColorBTNClicked);

    window.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.classList?.contains(HIGHTED_CLASS)) return;
      // if (target?.classList.contains('hight-colorChanger-button')) return;
      // hide();
    });

    window.addEventListener('scroll', () => {
      if (hightClicked) {
        moveToolbarToHight(currentHightEl);
      }
    });
  });
}

function moveToolbarToHight(hightEl: Element, position?: number) {
  const boundingRect = hightEl.getBoundingClientRect();
  const toolWidth = 108;

  const hoverTop = boundingRect.top - 45;
  getHoverToolEl()?.css({ top: hoverTop });

  if (position !== undefined) {
    let hoverLeft = null;
    if (boundingRect.width < toolWidth) {
      hoverLeft = boundingRect.left < boundingRect.width / 2 - toolWidth / 2;
    } else if (position - boundingRect.left < toolWidth / 2) {
      hoverLeft = boundingRect.left;
    } else if (boundingRect.right - position < toolWidth / 2) {
      hoverLeft = boundingRect.right - toolWidth;
    } else {
      hoverLeft = position - toolWidth / 2;
    }

    getHoverToolEl()?.css({ left: hoverLeft });
  }
}

function onCopyBTNClicked(): void {
  const hightId = currentHightEl.getAttribute(CUSTOM_HIGHT_DATA_ID);
  const hights = document.querySelectorAll(
    `.${HIGHTED_CLASS}[${CUSTOM_HIGHT_DATA_ID}='${hightId}']`,
  );
  const hightText = Array.from(hights)
    .map((el) => el.textContent?.replace(/\s+/gmu, ' '))
    .join('');
  window.navigator.clipboard.writeText(hightText);
  chrome.runtime.sendMessage({
    action: 'track-event',
    trackCategory: 'hight-action',
    trackAction: 'copy',
  } as ChromeMessage);
}

function onDeleteBTNClicked(): void {
  const hightId = Number(currentHightEl.getAttribute(CUSTOM_HIGHT_DATA_ID));
  removeHight(hightId);

  getHoverToolEl()?.hide();
  clearTimeout(hoverToolTimeout);
  chrome.runtime.sendMessage({
    action: 'track-event',
    trackCategory: 'hight-action',
    trackAction: 'delete',
  } as ChromeMessage);
}

function onChangeColorBTNClicked(): void {
  const hightId = currentHightEl.getAttribute(CUSTOM_HIGHT_DATA_ID);
  if (hightId !== null) {
    updateHightColor(Number(hightId));
    chrome.runtime.sendMessage({
      action: 'track-event',
      trackCategory: 'hight-action',
      trackAction: 'change-color',
    } as ChromeMessage);
  }
}

function onHoverToolMouseEnter() {
  if (hoverToolTimeout !== null) {
    clearTimeout(hoverToolTimeout);
    clearTimeout(hoverToolTimeout);
  }
}

function onHoverToolMouseLeave() {}

function hide() {
  $('.hight-hovered').removeClass('hight-hovered');
  getHoverToolEl()?.hide();
  clearTimeout(hoverToolTimeout);
  hightClicked = false;
}

function initializeHightEventListener(hightElement: Node) {
  hightElement.addEventListener('mouseenter', onHightMouseEnterOrClick);
  hightElement.addEventListener('click', onHightMouseEnterOrClick);
  hightElement.addEventListener('mouseleave', onHightMouseLeave);
}

function removeHightEventListeners(hightElement: Node) {
  hightElement.removeEventListener('mouseenter', onHightMouseEnterOrClick);
  hightElement.removeEventListener('click', onHightMouseEnterOrClick);
  hightElement.removeEventListener('mouseleave', onHightMouseLeave);
}

function getHoverToolEl() {
  if (!hoverToolEl.isConnected) {
    hoverToolEl.appendTo('body');
  }
  return hoverToolEl;
}

function onHightMouseEnterOrClick(e: Event) {
  const newHightEl = e.target as Element;
  const newHightId = newHightEl?.getAttribute('data-hight-id');

  if (hightClicked && e.type !== 'click') return;

  hightClicked = e.type === 'click';

  if (hoverToolTimeout !== null) {
    clearTimeout(hoverToolTimeout);

    if (newHightId === currentHightEl.getAttribute('data-hight-id')) return;
  }

  currentHightEl = newHightEl;

  moveToolbarToHight(newHightEl, (e as MouseEvent).clientX);

  $('.hight-hovered').removeClass('hight-hovered');
  $(`.${HIGHTED_CLASS}[data-hight-id='${newHightId}']`).addClass(
    'hight-hoverd',
  );
}

function onHightMouseLeave() {
  if (!hightClicked) {
    hoverToolTimeout = setTimeout(hide, 170);
  }
}

export {
  initializeHoverTools,
  initializeHightEventListener,
  onHightMouseEnterOrClick,
  removeHightEventListeners,
};

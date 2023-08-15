import {
  CUSTOM_HIGHT_DATA_ID,
  CUSTOM_HIGHT_DATA_LEVEL,
  HIGHTED_CLASS,
  HOVERED_CLASS,
  tmpColorArray,
} from '../utils/constants';
import {
  updateColor as updateHightColor,
  updateLevel as updateHightLevel,
  remove as removeHight,
} from '../core';
import { ChromeMessage, ColorModel } from '../../utils/hight.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let hoverToolEl: JQuery<Node>;
let hoverToolTimeout: NodeJS.Timeout | null;
let currentHightEl: Element;
let hightClicked: boolean;
let copyBTNEl = null;
let deleteBTNEl = null;
// let changeColorBtnEl = null;
let levelONEBTN = null;
let levelTWOBTN = null;
let levelThreeBTN = null;
let levelFourBTN = null;

function initializeHoverTools() {
  $.get(chrome.runtime.getURL('src/hights/hoverTool/index.html'), (data) => {
    hoverToolEl = $(data);
    hoverToolEl.hide();
    hoverToolEl[0].addEventListener('mouseenter', onHoverToolMouseEnter);
    hoverToolEl[0].addEventListener('mouseleave', onHoverToolMouseLeave);

    copyBTNEl = hoverToolEl.find('.hight-copy-button')[0];
    deleteBTNEl = hoverToolEl.find('.hight-delete-button')[0];
    levelONEBTN = hoverToolEl.find('#hight-level-one-button')[0];
    levelTWOBTN = hoverToolEl.find('#hight-level-two-button')[0];
    levelThreeBTN = hoverToolEl.find('#hight-level-three-button')[0];
    levelFourBTN = hoverToolEl.find('#hight-level-four-button')[0];
    // changeColorBtnEl = hoverToolEl.find('.hight-colorChange-button')[0];

    copyBTNEl.addEventListener('click', onCopyBTNClicked);
    deleteBTNEl.addEventListener('click', onDeleteBTNClicked);
    levelONEBTN.addEventListener('click', onUpdateHightLevelClicked);
    levelTWOBTN.addEventListener('click', onUpdateHightLevelClicked);
    levelThreeBTN.addEventListener('click', onUpdateHightLevelClicked);
    levelFourBTN.addEventListener('click', onUpdateHightLevelClicked);
    // changeColorBtnEl.addEventListener('click', onChangeColorBTNClicked);

    window.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.classList?.contains(HIGHTED_CLASS)) return;
      // if (target?.classList.contains('hight-colorChanger-button')) return;
      hide();
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
      hoverLeft = boundingRect.left + boundingRect.width / 2 - toolWidth / 2;
    } else if (position - boundingRect.left < toolWidth / 2) {
      hoverLeft = boundingRect.left;
    } else if (boundingRect.right - position < toolWidth / 2) {
      hoverLeft = boundingRect.right - toolWidth;
    } else {
      hoverLeft = position - toolWidth / 2;
    }

    getHoverToolEl()?.css({ left: hoverLeft });
  }
  getHoverToolEl().show();
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
  hoverToolTimeout = null;
  chrome.runtime.sendMessage({
    action: 'track-event',
    trackCategory: 'hight-action',
    trackAction: 'delete',
  } as ChromeMessage);
}

export function onChangeColorBTNClicked(): void {
  // TODO: fixed
  const hightId = currentHightEl.getAttribute(CUSTOM_HIGHT_DATA_ID);
  if (hightId !== null) {
    updateHightColor(Number(hightId), 0);
    chrome.runtime.sendMessage({
      action: 'track-event',
      trackCategory: 'hight-action',
      trackAction: 'change-color',
    } as ChromeMessage);
  }
}

async function onUpdateHightLevelClicked(e: MouseEvent): Promise<void> {
  const hightId = currentHightEl.getAttribute(CUSTOM_HIGHT_DATA_ID);
  const target = e.target as Element;
  const level = target.getAttribute(CUSTOM_HIGHT_DATA_LEVEL);

  console.log('hightId:', hightId, 'level:', level);

  if (hightId !== null && level) {
    updateHightLevel(Number(hightId), Number(level));
  }
  chrome.runtime.sendMessage({
    action: 'track-event',
    trackCategory: 'hight-action',
    trackAction: 'update-level',
  } as ChromeMessage);

  const hightLevel = Number(level);
  updateHightColor(Number(hightId), hightLevel, {
    color: tmpColorArray[Number(level)],
  } as ColorModel);
}

function onHoverToolMouseEnter() {
  if (hoverToolTimeout !== null) {
    clearTimeout(hoverToolTimeout);
    hoverToolTimeout = null;
  }
}

function onHoverToolMouseLeave() {
  if (!hightClicked) {
    hoverToolTimeout = setTimeout(hide, 170);
  }
}

function hide() {
  $(`.${HOVERED_CLASS}`).removeClass(HOVERED_CLASS);
  getHoverToolEl()?.hide();
  hoverToolTimeout = null;
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
  if (!hoverToolEl.closest('document').length) {
    hoverToolEl.appendTo('body');
  }
  return hoverToolEl;
}

function onHightMouseEnterOrClick(e: Event) {
  const newHightEl = e.target as Element;
  const newHightId = newHightEl.getAttribute(`${CUSTOM_HIGHT_DATA_ID}`);

  if (hightClicked && e.type !== 'click') {
    return;
  }

  hightClicked = e.type === 'click';

  if (hoverToolTimeout !== null) {
    clearTimeout(hoverToolTimeout);
    hoverToolTimeout = null;
    if (
      currentHightEl &&
      newHightId === currentHightEl?.getAttribute(CUSTOM_HIGHT_DATA_ID)
    ) {
      return;
    }
  }
  currentHightEl = newHightEl;
  moveToolbarToHight(newHightEl, (e as MouseEvent).clientX);

  $(`.${HOVERED_CLASS}`).removeClass(HOVERED_CLASS);
  $(`.${HIGHTED_CLASS}[${CUSTOM_HIGHT_DATA_ID}='${newHightId}']`).addClass(
    HOVERED_CLASS,
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
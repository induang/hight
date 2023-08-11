import { removeHightEventListeners } from '../hover';
import { update as updateStorage } from '../storage';
import {
  DELETED_CLASS,
  HIGHTED_CLASS,
  HOVERED_CLASS,
} from '../utils/constants';

function remove(hightId: number) {
  const hights = $(`.${HIGHTED_CLASS}[data-hight-id='${hightId}']`);
  $(`.${HOVERED_CLASS}`).removeClass(HOVERED_CLASS);

  hights.css('backgroundColor', 'inherit');
  hights.css('color', 'inherit');
  hights.removeClass(HIGHTED_CLASS).addClass(DELETED_CLASS);

  updateStorage(
    hightId,
    window.location.hostname + window.location.pathname,
    window.location.pathname,
    'inherit',
    'inherit',
  );

  hights.each((_, el) => {
    removeHightEventListeners(el);
  });

  chrome.runtime.sendMessage({ action: 'hight-change' });
}

export default remove;

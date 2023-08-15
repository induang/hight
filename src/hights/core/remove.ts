import { removeHightEventListeners } from '../hoverTool';
import { update as updateStorage } from '../storage';
import {
  CUSTOM_HIGHT_DATA_ID,
  DELETED_CLASS,
  HIGHTED_CLASS,
  HOVERED_CLASS,
} from '../utils/constants';

function remove(hightIndex: number) {
  const hights = $(
    `.${HIGHTED_CLASS}[${CUSTOM_HIGHT_DATA_ID}='${hightIndex}']`,
  );
  $(`.${HOVERED_CLASS}`).removeClass(HOVERED_CLASS);

  hights.css('backgroundColor', 'inherit');
  hights.css('color', 'inherit');
  hights.removeClass(HIGHTED_CLASS).addClass(DELETED_CLASS);

  updateStorage(
    hightIndex,
    window.location.hostname + window.location.pathname,
    0,
    'inherit',
    'inherit',
  );

  hights.each((_, el) => {
    removeHightEventListeners(el);
  });

  chrome.runtime.sendMessage({ action: 'hight-change' });
}

export default remove;

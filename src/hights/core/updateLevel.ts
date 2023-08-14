import { updateLevel as updateStorage } from '../storage';
import {
  CUSTOM_HIGHT_DATA_ID,
  HIGHTED_CLASS,
  HIGHTED_LEVEL_CLASS,
} from '../utils/constants';

async function updateLevel(hightId: number, level: number) {
  const hights = $(`.${HIGHTED_CLASS}[${CUSTOM_HIGHT_DATA_ID}='${hightId}']`);
  for (let i = 1; i < 5; i++) {
    hights.removeClass(HIGHTED_LEVEL_CLASS[i]);
  }
  hights.addClass(HIGHTED_LEVEL_CLASS[level]);

  updateStorage(
    hightId,
    window.location.hostname + window.location.pathname,
    level,
  );

  chrome.runtime.sendMessage({ action: 'hight-change' });
}

export default updateLevel;

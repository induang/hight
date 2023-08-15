import { updateLevel as updateStorage } from '../storage';
import {
  CUSTOM_HIGHT_DATA_ID,
  CUSTOM_HIGHT_DATA_LEVEL_CLASS,
  HIGHTED_CLASS,
} from '../utils/constants';

async function updateLevel(hightId: number, level: number) {
  const hights = $(`.${HIGHTED_CLASS}[${CUSTOM_HIGHT_DATA_ID}='${hightId}']`);

  hights.attr(CUSTOM_HIGHT_DATA_LEVEL_CLASS, null);
  hights.attr(CUSTOM_HIGHT_DATA_LEVEL_CLASS, level);

  await updateStorage(
    hightId,
    window.location.hostname + window.location.pathname,
    level,
  );

  chrome.runtime.sendMessage({ action: 'hight-change' });
}

export default updateLevel;

import { removeLostHight } from '../errorHandler';
import { removeHight as removeHightFromStorage } from '../storage';

function removeLost(hightId: number) {
  removeLostHight(hightId);
  removeHightFromStorage(
    hightId,
    window.location.hostname + window.location.pathname,
  );

  chrome.runtime.sendMessage({ action: 'hight-change' });
}

export default removeLost;

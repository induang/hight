import { load } from '../storage';
import { HightModel, HightErrorModel } from '../../utils/hight.type';

const MAX_RETRY_TIME = 1000;
const RETRY_INTERVAL = 500;

const lostHights = new Map<number, HightErrorModel>();

function addHightError(hightVal: HightModel, hightIndex: number): void {
  const hightError: HightErrorModel = {
    hightVal,
    hightIndex,
    errorTime: Date.now(),
  };
  hightError.timeout = setTimeout(retryHightError, RETRY_INTERVAL, hightError);
  lostHights.set(hightIndex, hightError);
}

function retryHightError(hightError: HightErrorModel): void {
  const success = load(hightError.hightVal, hightError.hightIndex, true);

  if (success) {
    lostHights.delete(hightError.hightIndex);
    return;
  }

  if (Date.now() - hightError.errorTime < MAX_RETRY_TIME) {
    hightError.timeout = setTimeout(
      retryHightError,
      RETRY_INTERVAL,
      hightError,
    );
  }
}

function getLostHights(): Map<number, HightErrorModel> {
  return lostHights;
}

function removeLostHight(hightIndex: number): void {
  const hightError = lostHights.get(hightIndex);
  if (hightError && 'timeout' in hightError) {
    clearTimeout(hightError.timeout);
    lostHights.delete(hightIndex);
  }
}

export { addHightError, getLostHights, removeLostHight };

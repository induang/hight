import { HightItemModel, HightModel } from '../types.type';

function getFromBackgroundPage(payload: unknown, ignoreError = true) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(payload, (response) => {
      const error = chrome.runtime.lastError;
      if (!ignoreError && error) {
        reject(error);
        return;
      }

      if (!ignoreError && response.success === false) {
        reject(response.error);
        return;
      }
      resolve(response.response);
    });
  });
}

function structHights(hights: Array<HightModel>): Array<HightItemModel> {
  if (!hights.length) return [];
  const result: Array<HightItemModel> = [];
  console.log('handle hights:', hights);
  // result.push({
  //   hightIndex: hights[0].hightIndex,
  //   hightText: hights[0].hightText,
  // });
  // for (let i = 1; i < hights.length; i++) {
  //   if (!hights[i]) continue;
  //   if (hights[i].hightLevel < hights[i - 1].hightLevel) {
  //     result[result.length - 1].children?.push({
  //       hightIndex: hights[i].hightIndex,
  //       hightText: hights[i].hightText,
  //     });
  //   } else if (hights[i].hightLevel === hights[i - 1].hightLevel) {
  //     result.push({
  //       hightIndex: hights[i].hightIndex,
  //       hightText: hights[i].hightText,
  //     });
  //   } else {
  //   }
  // }
  return result;
}

export { getFromBackgroundPage, structHights };

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
  hights = hights.filter((hight) => hight !== null);
  if (hights.length === 0) return [];

  const result: Array<HightItemModel> = [];
  const lengthOfHights = hights.length;
  let index = 0;

  function dfs(array: Array<HightItemModel>, currentIndex: number) {
    const newItem: HightItemModel = {
      hightIndex: hights[index].hightIndex,
      hightLevel: hights[index].hightLevel,
      hightText: hights[index].hightText,
      hightBGColor: hights[index].hightBGColor,
      children: [],
    };
    array.push(newItem);
    index++;

    if (index >= lengthOfHights) throw new Error('index overflow');

    if (hights[index].hightLevel > hights[index - 1].hightLevel) {
      dfs(array[array.length - 1].children, index);
    } else if (hights[index].hightLevel === hights[index - 1].hightLevel) {
      dfs(array, index);
    } else {
      return;
    }
    if (hights[index].hightLevel >= hights[currentIndex].hightLevel) {
      dfs(array, index);
    }
  }

  try {
    dfs(result, 0);
  } catch (e) {}

  return result;
}

export { getFromBackgroundPage, structHights };

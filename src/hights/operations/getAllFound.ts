import { CUSTOM_HIGHT_DATA_ID, HIGHTED_CLASS } from '../utils/constants';

function getAllFound(): Map<string, string> | null {
  const hights = document.getElementsByClassName(HIGHTED_CLASS);
  if (!hights) return null;
  else {
    return Array.from(hights)
      .map((hight) => [
        hight.getAttribute(`${CUSTOM_HIGHT_DATA_ID}`),
        hight.textContent?.replace(/\s+/gmu, ' ').trim(),
      ])
      .reduce((acc, [hightId, hightText]) => {
        if (acc.has(hightId)) {
          acc.set(hightId, `${acc.get(hightId)} ${hightText}`);
        } else {
          acc.set(hightId, hightText);
        }
        return acc;
      }, new Map());
  }
}

export default getAllFound;

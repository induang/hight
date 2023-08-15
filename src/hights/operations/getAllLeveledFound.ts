import {
  CUSTOM_HIGHT_DATA_ID,
  CUSTOM_HIGHT_DATA_LEVEL_CLASS,
  LEVELED_CLASS,
} from '../utils/constants';

function getAllLeveledFound(): Map<string, string> | null {
  const hights = document.getElementsByClassName(LEVELED_CLASS);
  if (!hights) return null;
  else {
    return Array.from(hights)
      .map((hight) => [
        hight.getAttribute(`${CUSTOM_HIGHT_DATA_ID}`),
        hight.getAttribute(`${CUSTOM_HIGHT_DATA_LEVEL_CLASS}`),
        hight.textContent?.replace(/\s+/gmu, ' ').trim(),
      ])
      .reduce((acc, [hightId, hightLevelClass, hightText]) => {
        if (acc.has(hightId)) {
          acc.set(hightId, `${acc.get(hightId)} ${hightText}`);
        } else {
          acc.set(hightId, { hightLevelClass, hightText });
        }
        return acc;
      }, new Map());
  }
}

export default getAllLeveledFound;

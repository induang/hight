import {
  CUSTOM_HIGHT_DATA_ID,
  CUSTOM_HIGHT_DATA_LEVEL_CLASS,
  HIGHTED_CLASS,
} from '../utils/constants';

function getAllFound(): Map<
  string,
  { hightLevel: string; hightText: string }
> | null {
  const hights = document.getElementsByClassName(HIGHTED_CLASS);
  if (!hights) return null;
  else {
    return Array.from(hights)
      .map((hight) => [
        hight.getAttribute(`${CUSTOM_HIGHT_DATA_ID}`),
        hight.getAttribute(`${CUSTOM_HIGHT_DATA_LEVEL_CLASS}`),
        hight.textContent?.replace(/\s+/gmu, ' ').trim(),
        // hight.parent.id
      ])
      .reduce((acc, [hightId, hightLevel, hightText]) => {
        if (acc.has(hightId)) {
          acc.set(hightId, {
            hightLevel,
            hightText: `${acc.get(hightId).hightText}${hightText}`,
          });
        } else {
          acc.set(hightId, {
            hightLevel,
            hightText,
          });
        }
        return acc;
      }, new Map());
  }
}

export default getAllFound;

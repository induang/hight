import { CUSTOM_HIGHT_DATA_ID } from '../utils/constants';

function show(hightId: string | number) {
  const hightEl = document.querySelector(
    `[${CUSTOM_HIGHT_DATA_ID}="${hightId}"]`,
  );
  if (hightEl) {
    hightEl.scrollIntoView(true);
  }
}

export default show;

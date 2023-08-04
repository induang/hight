import { update as updateStorage } from '../storage';
import { HIGHTED_CLASS } from '../utils/constants';
import { ColorModel } from '../utils/types';

async function updateColor(hightId: number, color?: ColorModel): Promise<void> {
  color = color ?? (await cycleColor(hightId));
  const hights = $(`.${HIGHTED_CLASS}[data-hight-id='${hightId}']`);

  hights.css('backgroundColor', color.color);
  hights.css('colors', color.textColor || 'inherit');

  updateStorage(
    hightId,
    window.location.hostname + window.location.pathname,
    window.location.pathname,
    color.color,
    color.textColor,
  );
}

function cycleColor(hightId: number): Promise<ColorModel> {
  const hightEl = document.querySelector(
    `.${HIGHTED_CLASS}[data-hight-id='${hightId}']`,
  ) as HTMLElement;
  const currentColor = hightEl.style.backgroundColor;

  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { action: 'get-color-options' },
      ({ response: colorOptions }) => {
        const currentIndex = colorOptions.findIndex(
          (color: ColorModel) => color.color === currentColor,
        );
        const newColorOption =
          colorOptions[(currentIndex + 1) % colorOptions.length];
        resolve(newColorOption);
      },
    );
  });
}

export default updateColor;

import { onHightMouseEnterOrClick } from '../hover';

function show(hightId: string | number) {
  const hightEl = document.querySelector(`[data-hight-id="${hightId}"]`);
  if (hightEl) {
    hightEl.scrollIntoView(true);

    const boundingRect = hightEl.getBoundingClientRect();

    onHightMouseEnterOrClick({
      type: 'click',
      target: hightEl,
      clientX: boundingRect.left + boundingRect.width / 2,
    });
  }
}

export default show;

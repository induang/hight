import hight from './hight';
import { store } from '../storage';
import { ColorModel } from '../utils/types';

async function createHightBlock(
  color: ColorModel,
  selection = window.getSelection()!,
) {
  const selectionString = selection?.toString();
  if (!selectionString) return;
  let container = selection?.getRangeAt(0).commonAncestorContainer;
  if (container !== undefined) {
    while (container && !('innerHTML' in container)) {
      if (container.parentNode) {
        container = container.parentNode;
      }
    }
  }
  const hightBlockIndex = await store(
    selection,
    container,
    location.hostname + location.pathname,
    location.href,
    color.color,
    color.textColor,
  );

  hight(
    selectionString,
    container,
    selection,
    color.color,
    color.textColor,
    hightBlockIndex,
  );
}

export default createHightBlock;

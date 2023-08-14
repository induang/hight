import hight from './hight';
import { store } from '../storage';
import { ColorModel, SelectionSimplifiedModel } from '../../utils/hight.type';

async function createHightBlock(
  color: ColorModel,
  selection = window.getSelection()!,
) {
  const selectionString = selection?.toString();
  if (!selectionString) return;
  let container = selection?.getRangeAt(0).commonAncestorContainer;

  // when container just text node
  while (container && container.parentNode && !('innerHTML' in container)) {
    container = container.parentNode;
  }

  const hightBlockIndex = await store(
    selection,
    container,
    location.hostname + location.pathname,
    location.href,
    color.color,
    color.textColor,
  );

  const selectionSimplified: SelectionSimplifiedModel = {
    anchorNode: selection.anchorNode!,
    anchorOffset: selection.anchorOffset,
    focusNode: selection.focusNode!,
    focusOffset: selection.focusOffset,
  };

  hight(
    selectionString,
    container,
    selectionSimplified,
    color.color,
    color.textColor,
    hightBlockIndex,
  );

  await chrome.runtime.sendMessage({ action: 'hight-change' });
}

export default createHightBlock;

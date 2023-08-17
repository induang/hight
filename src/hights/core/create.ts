import hight from './hight';
import { store } from '../storage';
import { ColorModel, SelectionSimplifiedModel } from '../../utils/hight.type';

async function createHightBlock(
  color: ColorModel,
  level: number,
  selection = window.getSelection()!,
) {
  const selectionString = selection?.toString();
  if (!selectionString) return;
  let container = selection?.getRangeAt(0).commonAncestorContainer;

  // When container just text node
  while (container && container.parentNode && !('innerHTML' in container)) {
    container = container.parentNode;
  }

  const hightBlockIndex = await store({
    selection,
    container,
    url: location.hostname + location.pathname,
    href: location.href,
    color: color.color,
    textColor: color.textColor,
    level,
  });

  const selectionSimplified: SelectionSimplifiedModel = {
    anchorNode: selection.anchorNode!,
    anchorOffset: selection.anchorOffset,
    focusNode: selection.focusNode!,
    focusOffset: selection.focusOffset,
  };

  hight({
    selectionString,
    container,
    selection: selectionSimplified,
    color: color.color,
    textColor: color.textColor,
    hightIndex: hightBlockIndex,
    hightLevel: level,
  });

  await chrome.runtime.sendMessage({ action: 'hight-change' });
}

export default createHightBlock;

import { initializeHightEventListener } from '../../hover';
import { DELETED_CLASS, HIGHTED_CLASS } from '../../utils/constants';
import {
  HightInfoModel,
  SelectionSimplifiedModel,
} from '../../../utils/hight.type';

export default function hightV1(
  selectionString: string,
  container: Node,
  selection: SelectionSimplifiedModel,
  color: string,
  textColor: string,
  hightIndex: number,
): boolean {
  console.log('✨✨ hight:', new Date().toISOString(), '✨✨');
  const hightInfo: HightInfoModel = {
    color: color || 'yellow',
    textColor: textColor || 'inherit',
    hightIndex,
    selectionString,
    anchor: $(selection.anchorNode),
    anchorOffset: selection.anchorOffset,
    focus: $(selection.focusNode),
    focusOffset: selection.focusOffset,
  };

  try {
    recursiveWrapper($(container), hightInfo);
  } catch (e) {
    return false;
  }

  // STEP 3
  if (selection?.removeAllRanges) selection.removeAllRanges();

  // STEP 4 add event listener
  const parent = $(container).parent();
  parent.find(`.${HIGHTED_CLASS}`).each((_i, el) => {
    initializeHightEventListener(el);
  });

  return true;
}

function recursiveWrapper(container: JQuery<Node>, hightInfo: HightInfoModel) {
  return _recursiveWrapper(container, hightInfo, 0, 0);
}

function _recursiveWrapper(
  container: JQuery<Node>,
  hightInfo: HightInfoModel,
  startFound: number,
  charsHighted: number,
) {
  const {
    anchor,
    focus,
    anchorOffset,
    focusOffset,
    color,
    textColor,
    hightIndex,
    selectionString,
  } = hightInfo;
  const selectionLength = selectionString.length;

  container.contents().each((_index, element) => {
    if (charsHighted >= selectionLength) return;

    if (element.nodeType !== Node.TEXT_NODE) {
      const jqElement = $(element);

      if (
        jqElement.is(':visible') &&
        getComputedStyle(element as Element).visibility !== 'hidden'
      ) {
        [startFound, charsHighted] = _recursiveWrapper(
          jqElement,
          hightInfo,
          startFound,
          charsHighted,
        );
      }
      return;
    }

    let startIndex = 0;
    if (!startFound) {
      if (!anchor.is(element as Element) && !focus.is(element as Element))
        return;

      startFound = 1;
      startIndex = Math.min(
        ...[
          ...(anchor.is(element as Element) ? [anchorOffset] : []),
          ...(anchor.is(element as Element) ? [focusOffset] : []),
        ],
      );
    }
    const { nodeValue, parentElement: parent } = element;

    if (nodeValue && startIndex > nodeValue?.length) {
      throw new Error(
        `No match found for highlight string '${selectionString}'`,
      );
    }

    const hightTextEl = (element as Text).splitText(startIndex);

    let i = startIndex;
    for (; nodeValue && i < nodeValue?.length; i++) {
      while (
        charsHighted < selectionLength &&
        selectionString[charsHighted].match(/\s/u)
      )
        charsHighted++;

      if (charsHighted >= selectionLength) break;

      const char = nodeValue[i];
      if (char === selectionString[charsHighted]) {
        charsHighted++;
      } else if (!char.match(/\s/u)) {
        throw new Error(
          `No match found for highlight string '${selectionString}'`,
        );
      }
    }

    if (parent?.classList.contains(HIGHTED_CLASS)) {
      return;
    }

    const elementCharCount = i - startIndex;
    const insertBeforeElement = hightTextEl.splitText(elementCharCount);
    const hightText = hightTextEl.nodeValue;

    if (hightText?.match(/^\s*$/u)) {
      parent?.normalize();
      return;
    }

    const hightNode = document.createElement('span');
    hightNode.classList.add(
      color === 'inherit' ? DELETED_CLASS : HIGHTED_CLASS,
    );
    hightNode.style.backgroundColor = color;
    hightNode.style.color = textColor;
    hightNode.dataset.hightId = String(hightIndex);
    hightNode.textContent = hightTextEl.nodeValue;
    hightTextEl.remove();
    parent?.insertBefore(hightNode, insertBeforeElement);
  });

  return [startFound, charsHighted];
}

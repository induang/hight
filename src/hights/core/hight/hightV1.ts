import { initializeHightEventListener } from '../../hover';
import { DELETED_CLASS, HIGHLIGHT_CLASS } from '../../utils/constants';
import { HightInfoModel, SelectionSimplifiedModel } from '../../utils/types';
import $ from 'jquery';

export default function hightV1(
  selectionString: string,
  container: Node,
  selection: SelectionSimplifiedModel,
  color: string,
  textColor: string,
  hightIndex: number,
): boolean {
  const hightInfo: HightInfoModel = {
    color: color ? color : 'yellow',
    textColor: textColor ? textColor : 'inherit',
    hightIndex,
    selectionString,
    anchor: $(selection.anchorNode!),
    anchorOffset: selection.anchorOffset,
    focus: $(selection.focusNode!),
    focusOffset: selection.focusOffset,
  };

  try {
    recursiveWrapper($(container), hightInfo);
  } catch (e) {
    return false;
  }

  // STEP 3
  // absent

  const parent = $(container).parent();
  parent.find(`.${HIGHLIGHT_CLASS}`).each((_i, el) => {
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
    const focusElement = element as Element;
    if (charsHighted >= selectionLength) return;

    if (focusElement.nodeType !== Node.TEXT_NODE) {
      const jqElement = $(focusElement);
      if (
        jqElement.is(':visible') &&
        getComputedStyle(focusElement).visibility !== 'hidden'
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
      if (!anchor.is(focusElement) && !focus.is(focusElement)) return;

      startFound = 1;
      startIndex = Math.min(
        ...[
          ...(anchor.is(focusElement) ? [anchorOffset] : []),
          ...(focus.is(focusElement) ? [focusOffset] : []),
        ],
      );
    }

    const { nodeValue, parentElement: parent } = focusElement;

    if (nodeValue?.length && startIndex > nodeValue?.length) {
      throw new Error(`No match found for hight string '${selectionString}'`);
    }

    const hightTextEl = (focusElement as unknown as Text).splitText(startIndex);

    let i = startIndex;
    for (; nodeValue?.length && i < nodeValue.length; i++) {
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
        throw new Error(`No match found for hight string '${selectionString}'`);
      }
    }

    if (parent?.classList.contains(HIGHLIGHT_CLASS)) return;

    const elementCharCount = i - startIndex;
    const insertBeforeElement = hightTextEl.splitText(elementCharCount);
    const hightText = hightTextEl.nodeValue;

    if (parent && hightText?.match(/^\s*$/u)) {
      parent.normalize();
      return;
    }

    const hightNode = document.createElement('span');
    hightNode.classList.add(
      color === 'inherit' ? DELETED_CLASS : HIGHLIGHT_CLASS,
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

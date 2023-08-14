import { addHightError } from '../errorHandler';
import { hight } from '../core';
import { HightModel, SelectionSimplifiedModel } from '../../utils/hight.type';

// maybe need write in manifest.json
const STORE_FORMAT_VERSION = chrome.runtime.getManifest().version;
let alternativeUrlIndexOffset = 0;

async function store(
  selection: Selection,
  container: Node,
  url: string,
  href: string,
  color: string,
  textColor: string,
): Promise<number> {
  const { yu_hight } = await chrome.storage.local.get({ yu_hight: {} });

  if (!yu_hight[url]) yu_hight[url] = [];

  const index = yu_hight[url].push({
    version: STORE_FORMAT_VERSION || '1.0',
    string: selection.toString(),
    container: getQuery(container),
    anchorNode: getQuery(selection.anchorNode!),
    anchorOffset: selection.anchorOffset,
    focusNode: getQuery(selection.focusNode!),
    focusOffset: selection.focusOffset,
    color,
    textColor,
    href,
    // TODO learn crypto
    uuid: crypto.randomUUID(),
    createdAt: Date.now(),
  } as HightModel);

  chrome.storage.local.set({ yu_hight });
  return index - 1 + alternativeUrlIndexOffset;
}

async function update(
  hightIndex: number,
  url: string,
  alternativeUrl: string,
  newColor: string,
  newTextColor: string,
): Promise<void> {
  const { yu_hight } = await chrome.storage.local.get({ yu_hight: {} });

  let urlToUse = url;
  let indexToUse = hightIndex - alternativeUrlIndexOffset;
  // QU: why
  if (hightIndex < alternativeUrlIndexOffset) {
    urlToUse = alternativeUrl;
    indexToUse = hightIndex;
  }

  const hightsOfUrl = yu_hight[urlToUse];
  if (hightsOfUrl) {
    const hightforUpdate = hightsOfUrl[indexToUse];
    if (hightforUpdate) {
      hightforUpdate.color = newColor;
      hightforUpdate.textColor = newTextColor;
      hightforUpdate.updatedAt = Date.now();
      chrome.storage.local.set({ yu_hight });
    }
  }
}

function elementFromQuery(storedQuery: string): Node | null {
  const re = />textNode:nth-of-type\(([0-9]+)\)$/iu;
  const result = re.exec(storedQuery);

  if (result) {
    const textNodeIndex = parseInt(result[1], 10);
    storedQuery = storedQuery.replace(re, '');
    const parent = robustQuerySelector(storedQuery);

    if (!parent) return null;

    return parent.childNodes[textNodeIndex];
  }
  return robustQuerySelector(storedQuery);
}

function robustQuerySelector(query: string): Node | null {
  try {
    return document.querySelector(query);
  } catch (error) {
    let element: Node = document;
    for (const queryPart of query.split('>')) {
      if (!element) return null;

      const re = /^(.*):nth-of-type\(([0-9]+)\)$/iu;
      const result = re.exec(queryPart);

      const [, tagName, index] = result ?? [undefined, queryPart, 1];
      element = Array.from(element.childNodes).filter(
        (child) => 'localName' in child && child.localName === tagName,
      )[Number(index) - 1];
    }
    return element;
  }
}

async function loadAll(url: string, alternativeUrl?: string): Promise<void> {
  const result = await chrome.storage.local.get({ yu_hight: {} });
  let yu_hight: Array<HightModel> = [];

  if (alternativeUrl) {
    yu_hight = yu_hight.concat(result.yu_hight[alternativeUrl] || []);
  }
  alternativeUrlIndexOffset = yu_hight.length;
  yu_hight = yu_hight.concat(result.yu_hight[url] || []);
  if (!yu_hight) return;
  for (let i = 0; i < yu_hight.length; i++) {
    load(yu_hight[i], i);
  }
}

function load(
  hightVal: HightModel,
  hightIndex: number,
  noErrorTracking?: boolean,
): boolean {
  const selection: SelectionSimplifiedModel = {
    anchorNode: elementFromQuery(hightVal.anchorNode)!,
    anchorOffset: hightVal.anchorOffset,
    focusNode: elementFromQuery(hightVal.focusNode)!,
    focusOffset: hightVal.focusOffset,
  };

  const { color, string: selectionString, textColor, version } = hightVal;
  const container = elementFromQuery(hightVal.container);

  if (!selection.anchorNode || !selection.focusNode || !container) {
    if (!noErrorTracking) {
      addHightError(hightVal, hightIndex);
    }
    return false;
  }

  const success = hight(
    selectionString,
    container,
    selection,
    color,
    textColor,
    hightIndex,
    version,
  );

  if (!noErrorTracking && !success) {
    addHightError(hightVal, hightIndex);
  }

  return success;
}

async function removeHight(
  hightIndex: number,
  url: string,
  alternativeUrl: string,
): Promise<void> {
  const { yu_hight } = await chrome.storage.local.get({ yu_hight: {} });

  if (hightIndex < alternativeUrlIndexOffset) {
    yu_hight[alternativeUrl].splice(hightIndex, 1);
  } else {
    yu_hight[url].splice(hightIndex - alternativeUrlIndexOffset, 1);
  }

  chrome.storage.local.set({ yu_hight });
}

async function clearPage(url: string, alternativeUrl?: string): Promise<void> {
  const { yu_hight } = await chrome.storage.local.get({ yu_hight: {} });

  delete yu_hight[url];

  if (alternativeUrl) {
    delete yu_hight[alternativeUrl];
  }

  chrome.storage.local.set({ yu_hight });
}

function getQuery(element: Node): string {
  if ('id' in element && element.id)
    return `#${escapeCSString(element.id as string)}`;
  if ('localName' in element && element.localName === 'html') return 'html';

  const parent = element.parentNode!;

  const parentSelector = getQuery(parent);

  // Text Node
  if (!('localName' in element)) {
    const index = Array.prototype.indexOf.call(parent.childNodes, element);
    return `${parentSelector}>textNode:nth-of-type(${index})`;
    // return `${parentSelector}`;
  } else {
    const index =
      Array.from(parent.childNodes)
        .filter(
          (child) =>
            'localName' in child && child.localName === element.localName,
        )
        .indexOf(element as unknown as ChildNode) + 1;
    return `${parentSelector}>${element.localName}:nth-of-type(${index})`;
  }
}

function escapeCSString(cssString: string): string {
  return cssString.replace(/(:)/gu, '\\$1');
}

export { store, clearPage, removeHight, load, loadAll, update };

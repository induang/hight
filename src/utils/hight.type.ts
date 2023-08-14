export type ColorModel = {
  title: string;
  color: string;
  textColor: string;
  name: string;
  code: string;
  level: number;
};

export type ColorOptionModel = {
  title: string;
  color: string;
  textColor?: string;
  name: string;
  code: string;
  level: number;
};
export type LocationObj = {
  hostname: string;
  pathname: string;
  href: string;
};

export type HightModel = {
  version: string;
  string: string;
  container: string;
  anchorNode: string;
  anchorOffset: number;
  focusNode: string;
  focusOffset: number;
  color: string;
  textColor: string;
  href: string;
  uuid: string;
  createdAt: number;
  level: number;
};

export type HightErrorModel = {
  hightVal: HightModel;
  hightIndex: number;
  errorTime: number;
  timeout?: NodeJS.Timeout;
};

export type SelectionSimplifiedModel = {
  removeAllRanges?: () => void;
  anchorNode: Node | Text | Element | Document;
  anchorOffset: number;
  focusNode: Node;
  focusOffset: number;
};

export type HightInfoModel = {
  color: string;
  textColor: string;
  hightIndex: number;
  selectionString: string;
  anchor: JQuery<Node>;
  anchorOffset: number;
  focus: JQuery<Node>;
  focusOffset: number;
  hightLevel: number;
};

export type ChromeMessage = {
  action: string;
  trackCategory: string;
  trackAction: string;
};

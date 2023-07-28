export type ColorModel = {
  color: string;
  textColor: string;
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
  uuid: string; // type arrow
  createdAt: number;
};

export type HightErrorModel = {
  hightVal: HightModel;
  hightIndex: number;
  errorTime: number;
  timeout?: NodeJS.Timeout;
};

export type SelectionSimplifiedModel = {
  anchorNode: Node;
  anchorOffset: number;
  focusNode: Node;
  focusOffset: number;
};

export type HightInfoModel = {
  color: string;
  textColor: string;
  hightIndex: number;
  selectionString: string;
  anchor: unknown;
  anchorOffset: number;
  focus: unknown;
  focusOffset: number;
};

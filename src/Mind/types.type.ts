export type HightModel = {
  hightIndex: string;
  hightText: string;
  hightLevel: number;
  hightBGColor: string;
};

export type HightItemModel = {
  hightIndex: string;
  hightLevel: number;
  hightText: string;
  hightBGColor: string;
  children: Array<HightItemModel>;
};

export interface ListenerRequest {
  action?: string;
}

export type HightModel = {
  hightIndex: string;
  hightText: string;
  hightLevel: number;
};

export type HightItemModel = {
  hightIndex: string;
  hightText: string;
  children?: Array<HightItemModel>;
};

export interface ListenerRequest {
  action?: string;
}

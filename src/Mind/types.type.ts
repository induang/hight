export type HightModel = {
  hightIndex: string;
  hightText: string;
  hightLevel: number;
};

export type HightItemModel = {
  hightIndex: string;
  hightLevel: number;
  hightText: string;
  parentIndex?: number;
  children: Array<HightItemModel>;
};

export interface ListenerRequest {
  action?: string;
}

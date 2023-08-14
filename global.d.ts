/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="chrome"/>
/// <reference types="jquery" />
/// <reference types="node" />

export {};

interface HightAPI {
  create: Function;
  remove: Function;
  removeLost: Function;
  show: Function;
  updateColor: Function;
  hight: Function;
}

interface HightOperationAPI {
  getAllFound: () => Map<string, string> | null;
  getAllLost: Function;
  deleteAll: Function;
  loadAll: Function;
}

declare global {
  interface Window {
    highterAPI: {
      hight: HightAPI;
      hights: HightOperationAPI;
      highterCursor: {
        toogle: Function;
      };
    };
  }
  interface globalThis {
    highterAPI: {
      hight: HightAPI;
      hights: HightOperationAPI;
      highterCursor: {
        toogle: Function;
      };
    };
  }
}

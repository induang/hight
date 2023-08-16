/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="chrome"/>
/// <reference types="jquery" />
/// <reference types="node" />

import { ColorModel } from './src/utils/hight.type';

export {};

interface HightAPI {
  create: (color: ColorModel, selection?: Window.Selection) => void;
  remove: Function;
  removeLost: Function;
  show: Function;
  updateColor: Function;
  hight: Function;
}

interface HightOperationAPI {
  getAllFound: Function;
  // getAllLeveledFound: Function;
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

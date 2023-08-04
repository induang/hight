/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="chrome"/>
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
  getAllFound: Function;
  getAllLost: Function;
  deleteAll: Function;
  loadAll: Function;
}

declare global {
  interface Window {
    highterAPI: {
      hight: HightAPI;
      hights: HightOperationAPI;
    };
  }
}

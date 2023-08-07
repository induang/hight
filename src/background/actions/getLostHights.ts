import { HightModel } from '../../utils/hight.type';
import { executeInCurrentTab } from '../utils';

function getLostHights() {
  function contentScriptGetLostHights() {
    const lostHights: { string: string; index: number }[] = [];
    window.highterAPI.hights
      .getAllLost()
      .forEach((hight: HightModel, index: number) =>
        lostHights.push({ string: hight?.string, index }),
      );
    return lostHights;
  }
  return executeInCurrentTab({ func: contentScriptGetLostHights });
}

export default getLostHights;

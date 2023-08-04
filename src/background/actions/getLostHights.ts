import { executeInCurrentTab } from '../utils';

function getLostHights() {
  function contentScriptGetLostHights() {
    const lostHights = [];
    window.highterAPI.hights
      .getAllLost()
      .forEach((hight, index) =>
        lostHights.push({ string: hight?.string, index }),
      );
  }
  return executeInCurrentTab({ func: contentScriptGetLostHights });
}

export default getLostHights;

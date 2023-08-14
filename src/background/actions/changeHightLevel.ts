import { executeInCurrentTab } from '../utils';

async function changeHightLevel(hightId: number, level: number) {
  function contentScriptUpdateLevel(hightId: number, level: number) {
    window.highterAPI.hight.updateLevel(hightId, level);
  }

  executeInCurrentTab({
    func: contentScriptUpdateLevel,
    args: [hightId, level],
  });
}
export default changeHightLevel;

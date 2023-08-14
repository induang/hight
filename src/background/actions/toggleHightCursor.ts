import { executeInCurrentTab } from '../utils';

function toggleHighterCursor() {
  function contentScriptToggleHighterCursor() {
    window.highterAPI.highterCursor.toogle();
  }

  executeInCurrentTab({ func: contentScriptToggleHighterCursor });
}

export default toggleHighterCursor;

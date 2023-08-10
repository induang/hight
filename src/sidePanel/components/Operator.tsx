import { useState } from 'react';
import { ChromeMessage } from '../../utils/hight.type';

export default function Operator() {
  const [isCursorToggleChecked, setIsCursorToggleChecked] = useState(false);

  const handleToggleClick = () => {
    setIsCursorToggleChecked(!isCursorToggleChecked);
    chrome.runtime.sendMessage({
      action: 'toggle-highter-cursor',
      source: 'popup',
    });
  };

  const handleDeleteAllClick = () => {
    chrome.runtime.sendMessage({ action: 'remove-hights' });
  };

  const handleCopyAllClick = () => {
    chrome.runtime.sendMessage({
      action: 'track-event',
      trackCategory: 'hight-action',
      trackAction: 'copy-all',
    } as ChromeMessage);
  };

  return (
    <div className="side-panel-header flex">
      <div className="grow">color panel</div>
      <div className="header-buttons-stack flex flex-col gap-y-1">
        <div className="flex items-center">
          <label className="text-base">CURSOR:</label>
          <input
            type="checkbox"
            className="toggle ml-1"
            checked={isCursorToggleChecked}
            onClick={handleToggleClick}
          />
        </div>
        <button
          className="btn btn-xs btn-outline"
          onClick={handleDeleteAllClick}
        >
          Delete All
        </button>
        <button className="btn btn-xs btn-outline" onClick={handleCopyAllClick}>
          Copy All
        </button>
      </div>
    </div>
  );
}

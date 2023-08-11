import { useContext, useState } from 'react';
import HightContext from '../contexts/HightContext';

export default function Operator() {
  const [isCursorToggleChecked, setIsCursorToggleChecked] = useState(false);
  const { hights, setHights } = useContext(HightContext);

  const handleToggleClick = async () => {
    await chrome.runtime.sendMessage({
      action: 'toggle-highter-cursor',
    });
    setIsCursorToggleChecked(!isCursorToggleChecked);
  };

  const handleDeleteAllClick = async () => {
    await chrome.runtime.sendMessage({ action: 'remove-hights' });
    setHights([]);
  };

  const handleCopyAllClick = () => {
    const text = hights?.reduce(
      (pre, hight) => pre + hight.hightText + '\n',
      '',
    );
    if (text) {
      window.navigator.clipboard.writeText(text);
    }
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

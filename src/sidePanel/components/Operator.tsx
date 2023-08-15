import { useContext, useState } from 'react';
import HightContext from '../contexts/HightContext';
import { getShowHighterCursor } from '../../hights/hightCursor';
import Palette from './Palette';

export default function Operator() {
  const [isCursorToggleChecked, setIsCursorToggleChecked] = useState(
    getShowHighterCursor(),
  );
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
    <div className="side-panel-header flex justify-between">
      <div className="grow">
        <Palette />
      </div>
      <div className="header-buttons-stack flex flex-col gap-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm">Cursor:</label>
          <input
            type="checkbox"
            className="toggle toggle-sm ml-1"
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
        <div className="flex items-center justify-between">
          <label className="text-sm">Tanslate:</label>
          <input type="checkbox" className="toggle toggle-sm ml-1" />
        </div>
      </div>
    </div>
  );
}

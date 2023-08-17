import { HightItemModel } from '../types.type';
import Higths from './Hights';

interface HightItemProps {
  hight: HightItemModel;
}

export default function HightItem({ hight }: HightItemProps) {
  const handleScrollIntoViewClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    chrome.runtime.sendMessage({
      action: 'show-hight',
      hightId: hight.hightIndex,
    });
  };
  const liBGStyle = hight.children.length ? '' : `${hight.hightBGColor}`;
  const summaryBGStyle = hight.children.length ? `${hight.hightBGColor}` : '';

  return (
    <li
      onClick={handleScrollIntoViewClick}
      className="rounded my-0.5"
      style={{ backgroundColor: liBGStyle }}
    >
      {hight?.children && hight.children.length === 0 && (
        <a>{hight.hightText}</a>
      )}
      {hight?.children && hight.children.length !== 0 && (
        <details open>
          <summary
            className="rounded"
            style={{ backgroundColor: summaryBGStyle }}
          >
            {hight.hightText}
          </summary>
          <Higths hights={hight.children} />
        </details>
      )}
    </li>
  );
}

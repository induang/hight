import { HightItemModel } from '../types.type';
import Higths from './Hights';

interface HightItemProps {
  hight: HightItemModel;
}

const tmpcolorArray = ['', 'primary', 'secondary', 'accent', 'ghost'];

export default function HightItem({ hight }: HightItemProps) {
  const handleScrollIntoViewClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    chrome.runtime.sendMessage({
      action: 'show-hight',
      hightId: hight.hightIndex,
    });
  };
  const liBGStyle = hight.children.length
    ? ''
    : `bg-custom-${tmpcolorArray[hight.hightLevel]}/50`;
  const summaryBGStyle = hight.children.length
    ? `bg-custom-${tmpcolorArray[hight.hightLevel]}/50`
    : '';

  return (
    <li
      onClick={handleScrollIntoViewClick}
      className={`rounded my-1 ${liBGStyle}`}
    >
      {hight?.children && hight.children.length === 0 && (
        <a>{hight.hightText}</a>
      )}
      {hight?.children && hight.children.length !== 0 && (
        <details open>
          <summary className={`rounded ${summaryBGStyle}`}>
            {hight.hightText}
          </summary>
          <Higths hights={hight.children} />
        </details>
      )}
    </li>
  );
}

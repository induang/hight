import { HightItemModel } from '../types.type';

interface HightItemProps {
  hight: HightItemModel;
}

export default function HightItem({ hight }: HightItemProps) {
  const handleScrollIntoViewClick = () => {
    chrome.runtime.sendMessage({
      action: 'show-hight',
      hightId: hight.hightIndex,
    });
  };

  return (
    <li onClick={handleScrollIntoViewClick}>
      <a>{hight.hightText}</a>
    </li>
  );
}

import { HightItemModel } from '../types.type';
import Higths from './Hights';

interface HightItemWithSubProps {
  hight: HightItemModel;
}

export default function HightItemWithSub({ hight }: HightItemWithSubProps) {
  return (
    <details open>
      <summary>{hight.hightText}</summary>
      {hight.children?.length && <Higths hights={hight.children} />}
    </details>
  );
}

import HightItem from './HightItem';
import { HightItemModel } from '../types.type';
import HightItemWithSub from './HightItemWithSub';

interface HightsProps {
  hights: Array<HightItemModel>;
}

// 需要改写, 因为循环嵌套的关系, hights最好是通过props来获取
export default function Higths({ hights }: HightsProps) {
  return (
    <ul className="menu menu-md bg-base-200 w-full rounded-box">
      {hights?.map((hight) => {
        if (hight && hight.children?.length) {
          return <HightItemWithSub hight={hight} />;
        } else if (hight && !hight.children?.length) {
          return <HightItem hight={hight} />;
        } else return null;
      })}
    </ul>
  );
}

import HightItem from './HightItem';
import { HightItemModel } from '../types.type';

interface HightsProps {
  hights: Array<HightItemModel>;
}

export default function Higths({ hights }: HightsProps) {
  return (
    <ul className="menu menu-md w-full rounded-box">
      {hights?.map((hight) => <HightItem hight={hight} />)}
    </ul>
  );
}

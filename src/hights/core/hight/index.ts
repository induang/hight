import { SelectionSimplifiedModel } from '../../../utils/hight.type';
import hightV1 from './hightV1';

interface HightParams {
  selectionString: string;
  container: Node;
  selection: SelectionSimplifiedModel;
  color: string;
  textColor: string;
  hightIndex: number;
  hightLevel: number;
  version?: string;
}

export default function hight({
  selectionString,
  container,
  selection,
  color,
  textColor,
  hightIndex,
  hightLevel,
  version = '1.0',
}: HightParams): boolean {
  if (version === '1.0' || version === undefined) {
    return hightV1({
      selectionString,
      container,
      selection,
      color,
      textColor,
      hightIndex,
      hightLevel,
    });
  } else {
    return false;
  }
}

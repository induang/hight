import { SelectionSimplifiedModel } from '../../../utils/hight.type';
import hightV1 from './hightV1';

export default function hight(
  selectionString: string,
  container: Node,
  selection: SelectionSimplifiedModel,
  color: string,
  textColor: string,
  hightIndex: number,
  hightLevel?: number,
  version?: string,
): boolean {
  if (version === '1.0' || version === undefined) {
    return hightV1(
      selectionString,
      container,
      selection,
      color,
      textColor,
      hightIndex,
      hightLevel,
    );
  } else {
    return false;
  }
}

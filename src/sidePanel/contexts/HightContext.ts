import { createContext } from 'react';
import { HightItemModel } from '../../Mind/types.type';

interface HightContextParamsModel {
  hights?: Array<HightItemModel>;
  setHights: React.Dispatch<React.SetStateAction<Array<HightItemModel>>>;
}

const HightContext = createContext({} as HightContextParamsModel);

export default HightContext;

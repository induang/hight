import { useState } from 'react';
import Mind from '../Mind';
import Operator from './components/Operator';
import HightContext from './contexts/HightContext';
import { HightItemModel } from '../Mind/types.type';

export default function App() {
  const [hights, setHights] = useState<Array<HightItemModel>>([]);

  return (
    <HightContext.Provider value={{ hights, setHights }}>
      <div className="p-2">
        <Operator />
        <div className="mt-2">
          <Mind />
        </div>
      </div>
    </HightContext.Provider>
  );
}

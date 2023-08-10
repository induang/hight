import { useEffect, useState } from 'react';
import { getFromBackgroundPage } from './utils';

export default function Mind() {
  const [hights, setHights] = useState<Array<any>>();
  useEffect(() => {
    getFromBackgroundPage({ action: 'get-hights' }, false).then((hights) => {
      setHights(hights as Array<any>);
    });
  }, []);
  if (!hights?.length) return <>Empty.</>;
  return <>{hights?.map((hight) => <p>{hight}</p>)}</>;
}

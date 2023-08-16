import { useContext, useEffect } from 'react';
import HightContext from '../sidePanel/contexts/HightContext';
import Higths from './components/Hights';
import { HightModel, ListenerRequest } from './types.type';
import { getFromBackgroundPage, structHights } from './utils';

export default function Mind() {
  const { hights, setHights } = useContext(HightContext);
  useEffect(() => {
    getFromBackgroundPage({ action: 'get-hights' }, false).then((hights) => {
      const structedHights = structHights(hights as Array<HightModel>);
      setHights(structedHights);
    });
  }, []);

  useEffect(() => {
    const messageListener = (request: ListenerRequest) => {
      if (request.action === 'hight-change') {
        getFromBackgroundPage({ action: 'get-hights' }, false).then(
          (hights) => {
            const structedHights = structHights(hights as Array<HightModel>);
            setHights(structedHights);
          },
        );
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  if (!hights || hights.length === 0)
    return (
      <ul className="menu menu-md bg-base-200 w-full rounded-box">
        <li>
          <a>Hight now.</a>
        </li>
      </ul>
    );

  return <Higths hights={hights} />;
}

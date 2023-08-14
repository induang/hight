import { useContext, useEffect, useState } from 'react';
import HightItem from './HightItem';
import { getFromBackgroundPage } from '../utils';
import { HightItemModel } from '../types.type';
import HightContext from '../../sidePanel/contexts/HightContext';

export default function Higths() {
  const { hights, setHights } = useContext(HightContext);

  useEffect(() => {
    console.log('run');
    getFromBackgroundPage({ action: 'get-hights' }, false).then((hights) => {
      console.log('hights:', hights);
      setHights(hights as Array<HightItemModel>);
    });
  }, []);

  useEffect(() => {
    console.log('always run ');
    const messageListener = (
      request: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void,
    ) => {
      if (request.action === 'hight-change') {
        getFromBackgroundPage({ action: 'get-hights' }, false).then(
          (hights) => {
            console.log('hights:', hights);
            setHights(hights as Array<HightItemModel>);
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

  return (
    <ul className="menu menu-md bg-base-200 w-full rounded-box">
      {hights?.map(
        (hight) =>
          hight && <HightItem key={crypto.randomUUID()} hight={hight} />,
      )}
    </ul>
  );
}

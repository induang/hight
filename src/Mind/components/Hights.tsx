import { useEffect, useState } from 'react';
import HightItem from './HightItem';
import { getFromBackgroundPage } from '../utils';
import { HightItemModel } from '../types.type';

export default function Higths() {
  const [hights, setHights] = useState<Array<HightItemModel>>();

  useEffect(() => {
    getFromBackgroundPage({ action: 'get-hights' }, false).then((hights) => {
      console.log('initialze hights: ', hights);
      setHights(hights as Array<HightItemModel>);
    });
  }, []);

  useEffect(() => {
    const messageListener = (
      request: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void,
    ) => {
      if (request.action === 'hight-done') {
        getFromBackgroundPage({ action: 'get-hights' }, false).then(
          (hights) => {
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

  if (!hights) return <p>Empty.</p>;

  return (
    <ul className="menu menu-md bg-base-200 w-full rounded-box">
      {hights?.map((hight) => (
        <HightItem key={crypto.randomUUID()} hight={hight} />
      ))}
    </ul>
  );
}

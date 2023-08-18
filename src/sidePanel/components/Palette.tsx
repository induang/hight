import { useState, useEffect } from 'react';
import { ListenerRequest } from '../types.type';
import ColorCard from './ColorCard';

interface GetColorThemeResponse {
  response: {
    colors: Array<{ color: string }>;
    name: string;
  };
}

export default function Palette() {
  const [colors, setColors] = useState<Array<{ color: string }>>();

  useEffect(() => {
    chrome.runtime.sendMessage(
      { action: 'get-color-theme' },
      (response: GetColorThemeResponse) => {
        setColors(response.response.colors);
      },
    );
  }, []);

  useEffect(() => {
    console.log('reset colors');
    const messageListener = (request: ListenerRequest) => {
      if (request.action === 'select-color-theme') {
        chrome.runtime.sendMessage(
          { action: 'get-color-theme' },
          (response: GetColorThemeResponse) => {
            setColors(response.response.colors);
          },
        );
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div className="h-full flex content-center">
      <div className="w-26">
        <ColorCard colorTheme="cupcake" />
        <ColorCard colorTheme="fluore" />
        <ColorCard colorTheme="candy" />
      </div>
      <div className="colors-shower m-auto h-full ">
        <h6 className="text-center text-lg mb-1">THEME</h6>
        <div className="grid grid-cols-2 gap-1 place-items-center place-content-center">
          {colors?.map((color, index) => (
            <span
              id={`hight-level-button-${index + 1}`}
              className="hight-button hight-level-button"
              data-hight-level={index + 1}
              style={{ backgroundColor: `${color.color}` }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

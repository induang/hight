interface ColorCardProps {
  colorTheme: string;
}

const map = new Map();
map.set('cupcake', 'CUPCAKES');
map.set('fluore', 'FLUORESCENT RAINBOW');
map.set('candy', 'CONTRASTING PASTELS');

export default function ColorCard({ colorTheme }: ColorCardProps) {
  const colors = ['primary', 'secondary', 'accent', 'ghost'];

  const themeName = map.get(colorTheme);
  const handleSelectThemeClick = () => {
    chrome.runtime.sendMessage({
      action: 'select-color-theme',
      theme: themeName,
    });
  };

  return (
    <div
      className="flex bg-stone-50 rounded border-2 border-stone-50 my-1 cursor-pointer"
      onClick={handleSelectThemeClick}
    >
      {colors.map((color) => (
        <div className={`w-6 h-6 gap-1 bg-custom-${colorTheme}-${color}`}></div>
      ))}
    </div>
  );
}

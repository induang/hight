interface ColorCardProps {
  colorTheme: string;
}

export default function ColorCard({ colorTheme }: ColorCardProps) {
  const colors = ['primary', 'secondary', 'accent', 'ghost'];
  return (
    <div className="flex bg-stone-50 rounded border-2 border-stone-50 my-1 cursor-pointer">
      {colors.map((color) => (
        <div className={`w-6 h-6 gap-1 bg-custom-${colorTheme}-${color}`}></div>
      ))}
    </div>
  );
}

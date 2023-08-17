import ColorCard from './ColorCard';

export default function Palette() {
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
          <span
            id="hight-level-one-button"
            className="hight-button hight-level-button bg-custom-cupcake-primary"
            data-hight-level="1"
          ></span>
          <span
            id="hight-level-two-button"
            className="hight-button hight-level-button bg-custom-cupcake-secondary"
            data-hight-level="2"
          ></span>
          <span
            id="hight-level-three-button"
            className="hight-button hight-level-button bg-custom-cupcake-accent"
            data-hight-level="3"
          ></span>
          <span
            id="hight-level-four-button"
            className="hight-button hight-level-button bg-custom-cupcake-ghost"
            data-hight-level="4"
          ></span>
        </div>
      </div>
    </div>
  );
}

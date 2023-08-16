export default function Palette() {
  return (
    <div className="m-auto h-full grid grid-cols-2 gap-2 place-items-center place-content-center">
      <span
        id="hight-level-one-button"
        className="hight-button hight-level-button bg-custom-primary"
        data-hight-level="1"
      ></span>
      <span
        id="hight-level-two-button"
        className="hight-button hight-level-button bg-custom-secondary"
        data-hight-level="2"
      ></span>
      <span
        id="hight-level-three-button"
        className="hight-button hight-level-button bg-custom-accent"
        data-hight-level="3"
      ></span>
      <span
        id="hight-level-four-button"
        className="hight-button hight-level-button bg-custom-ghost"
        data-hight-level="4"
      ></span>
    </div>
  );
}

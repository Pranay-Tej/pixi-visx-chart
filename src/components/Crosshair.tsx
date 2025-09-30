type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke?: string;
  strokeWidth?: number;
};

function Crosshair(props: Props) {
  const {
    x,
    y,
    width,
    height,
    stroke = "hsl(0, 0%, 50%)",
    strokeWidth = 1,
  } = props;
  return (
    <pixiContainer>
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.moveTo(x, 0).lineTo(x, height).stroke({
            width: strokeWidth,
            color: stroke,
          });
        }}
      />
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.moveTo(0, y).lineTo(width, y).stroke({
            width: strokeWidth,
            color: stroke,
          });
        }}
      />
    </pixiContainer>
  );
}

export default Crosshair;

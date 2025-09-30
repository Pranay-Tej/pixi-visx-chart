type Props = {
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
  width: number;
  yScale: (value: number) => number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
function Candle(props: Props) {
  const { open, high, low, close, x, yScale, width } = props;

  const isGreen = close >= open;
  const color = isGreen ? "hsl(120, 60%, 50%)" : "hsl(0, 60%, 50%)";

  return (
    <pixiGraphics
      interactive
      eventMode="static"
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      draw={(g) => {
        g.clear();
        // wick
        g.moveTo(x + width / 2, yScale(high))
          .lineTo(x + width / 2, yScale(low))
          .stroke({ width: 1, color: color });

        // body
        const bodyTop = yScale(Math.max(open, close));
        const bodyBottom = yScale(Math.min(open, close));
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1);

        g.rect(x, bodyTop, width, bodyHeight);
        g.fill(color);
      }}
    />
  );
}

export default Candle;

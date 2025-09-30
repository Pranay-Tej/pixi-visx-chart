import { useState } from "react";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const fillHighlight = "hsl(207, 90%, 30%)";

function Bar(props: Props) {
  const {
    x,
    y,
    width,
    height,
    fill = "hsl(207, 60%, 50%)",
    onMouseEnter,
    onMouseLeave,
  } = props;
  const [color, setColor] = useState(fill);

  return (
    <pixiGraphics
      interactive
      eventMode="static"
      onMouseEnter={() => {
        setColor(fillHighlight);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setColor(fill);
        onMouseLeave?.();
      }}
      draw={(g) => {
        g.clear();
        g.rect(x, y, width, height);
        g.fill(color);
      }}
    />
  );
}

export default Bar;

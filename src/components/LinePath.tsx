type Props<T> = {
  data: T[];
  x: (d: T) => number;
  y: (d: T) => number;
  stroke?: string;
  strokeWidth?: number;
  // fill?: string;
  // curve?: any;
};

function LinePath<T>(props: Props<T>) {
  const {
    data,
    x,
    y,
    stroke = "hsl(207, 60%, 50%)",
    strokeWidth = 1,
    // curve = curveLinear
  } = props;

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <pixiGraphics
      draw={(g) => {
        g.clear();
        g.moveTo(x(data[0]), y(data[0]));
        for (let i = 1; i < data.length; i++) {
          g.lineTo(x(data[i]), y(data[i]));
        }
        g.stroke({ width: strokeWidth, color: stroke });
      }}
    />
  );
}

export default LinePath;

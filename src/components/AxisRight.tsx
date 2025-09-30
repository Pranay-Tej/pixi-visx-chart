import type { ScaleLinear } from "d3-scale";

type Props = {
  scale: ScaleLinear<number, number>;
  label: string;
  width: number;
  height: number;
};

function AxisRight(props: Props) {
  const { scale, label, width, height } = props;

  return (
    <pixiContainer>
      {/* axis line */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.moveTo(width - 20, 0)
            .lineTo(width - 20, height - 5)
            .stroke({ width: 1, color: "black" });
        }}
      />
      {/* label */}
      <pixiText
        text={label}
        anchor={1}
        rotation={-Math.PI / 2}
        x={width - 5}
        y={height / 2}
        style={{
          fontSize: 12,
          fontWeight: "bold",
        }}
      />
      {/* ticks */}
      {scale.ticks().map((tickValue, i) => {
        const y = scale(tickValue);
        return (
          <pixiText
            key={i}
            text={tickValue.toString()}
            anchor={1}
            x={width - 25}
            y={y}
            style={{
              fontSize: 10,
            }}
          />
        );
      })}
    </pixiContainer>
  );
}

export default AxisRight;

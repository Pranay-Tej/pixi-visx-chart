import type { ScaleBand } from "d3-scale";

type Props = {
  scale: ScaleBand<string>;
  label: string;
  width: number;
  height: number;
};

function AxisBottom(props: Props) {
  const { scale, label, width, height } = props;

  return (
    <pixiContainer>
      {/* axis line */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.moveTo(0, height - 15)
            .lineTo(width - 5, height - 15)
            .stroke({ width: 1, color: "black" });
        }}
      />
      {/* label */}
      <pixiText
        text={label}
        anchor={1}
        x={width / 2}
        y={height}
        style={{
          fontSize: 12,
          fontWeight: "bold",
        }}
      />
      {/* ticks */}
      {scale.domain().map((tickValue, i) => {
        const x = scale(tickValue);
        return (
          <pixiGraphics
            key={i}
            draw={(g) => {
              g.clear();
              g.rect((x ?? 0), height - 20, scale.bandwidth(), 20);
              g.fill({ color: "hsla(0, 0%, 100%,95%)" });
            }}
          >
            <pixiText
              text={tickValue.toString()}
              x={(x ?? 0) - scale.bandwidth() / 2}
              y={height - 20}
              style={{
                fontSize: 10,
                align: "center",
              }}
            />
          </pixiGraphics>
        );
      })}
    </pixiContainer>
  );
}

export default AxisBottom;

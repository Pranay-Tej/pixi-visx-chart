import type { ScaleLinear } from "d3-scale";

type Props = {
  scale: ScaleLinear<number, number>;
  stroke?: string;
  width: number;
  // numTicks?: number;
  // tickValues?: number[];
};

function GridRows(props: Props) {
  const { scale, stroke = "#E9ECF0", width } = props;
  return (
    <pixiContainer>
      {scale.ticks().map((tickValue, i) => {
        const y = scale(tickValue);
        return (
          <pixiGraphics
            key={i}
            draw={(g) => {
              g.clear();
              g.moveTo(0, y)
                .lineTo(width, y)
                .stroke({ width: 1, color: stroke });
            }}
          />
        );
      })}
    </pixiContainer>
  );
}

export default GridRows;

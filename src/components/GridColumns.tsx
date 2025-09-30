import type { ScaleBand } from "d3-scale";

type Props = {
  scale: ScaleBand<string>;
  stroke?: string;
  height: number;
};

function GridColumns(props: Props) {
  const { scale, stroke = "#E9ECF0", height } = props;

  return (
    <pixiContainer>
      {scale.domain().map((tick) => {
        const x = scale(tick);
        return (
          <pixiGraphics
            key={tick}
            draw={(g) => {
              g.clear();
              g.moveTo(x ?? 0, 0)
                .lineTo(x ?? 0, height)
                .stroke({ width: 1, color: stroke });
            }}
          />
        );
      })}
    </pixiContainer>
  );
}

export default GridColumns;

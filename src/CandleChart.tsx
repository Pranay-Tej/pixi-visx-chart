import { Application } from "@pixi/react";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useState } from "react";
import AxisBottom from "./components/AxisBottom";
import AxisRight from "./components/AxisRight";
import Candle from "./components/Candle";
import Crosshair from "./components/Crosshair";
import GridColumns from "./components/GridColumns";
import GridRows from "./components/GridRows";
import useTooltipData from "./hooks/useTooltipData";

type Ohlc = {
  open: number;
  close: number;
  high: number;
  low: number;
};

const data: Record<string, Ohlc> = {
  "2023-09-01": {
    open: 30,
    close: 70,
    high: 90,
    low: 20,
  },
  "2023-09-02": {
    open: 80,
    close: 60,
    high: 85,
    low: 50,
  },
  "2023-09-03": {
    open: 40,
    close: 90,
    high: 95,
    low: 30,
  },
  "2023-09-04": {
    open: 70,
    close: 20,
    high: 75,
    low: 10,
  },
  "2023-09-05": {
    open: 50,
    close: 80,
    high: 90,
    low: 40,
  },
  "2023-09-06": {
    open: 60,
    close: 30,
    high: 70,
    low: 20,
  },
  "2023-09-07": {
    open: 90,
    close: 60,
    high: 100,
    low: 50,
  },
  "2023-09-08": {
    open: 40,
    close: 70,
    high: 80,
    low: 30,
  },
  "2023-09-09": {
    open: 30,
    close: 90,
    high: 95,
    low: 20,
  },
};

const height = 500;
const width = 800;
const margin = {
  top: 20,
  bottom: 20,
  left: 60,
  right: 20,
};

function CandleChart() {
  const [crossHair, setCrossHair] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const { hideTooltip, showTooltip, tooltipData } = useTooltipData<{
    date: string;
    value: Ohlc;
  }>();
  const xScale = scaleBand({
    domain: Object.keys(data),
    range: [margin.left, width - margin.right],
    padding: 0.6,
  });
  const yScale = scaleLinear({
    domain: [0, 100],
    range: [height - margin.bottom, margin.top],
  });
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return (
    <div>
      <h2>Candle Chart</h2>
      <Application background={"#ffffff"} width={width} height={height}>
        <pixiContainer
          interactive
          // interactiveChildren={false}
          eventMode="static"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onMouseMove={(e: any) => {
            const pos = e.data.global;
            setCrossHair({ x: pos.x, y: pos.y });
          }}
          onMouseLeave={() => {
            setCrossHair(null);
          }}
        >
          <GridRows scale={yScale} width={innerWidth} />
          <GridColumns scale={xScale} height={innerHeight} />
          <AxisRight
            scale={yScale}
            label="Price"
            width={width}
            height={height}
          />
          <AxisBottom
            scale={xScale}
            label="Date"
            width={width}
            height={height}
          />
          {tooltipData && (
            <pixiContainer>
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  g.rect(10, 10, 120, 120);
                  g.fill("hsl(0, 0%, 90%)");
                }}
              >
                <pixiText
                  text={`Date: ${tooltipData.date}\nValue: ${JSON.stringify(
                    tooltipData.value,
                    null,
                    2
                  )}`}
                  x={15}
                  y={15}
                  style={{
                    fontSize: 14,
                  }}
                />
              </pixiGraphics>
            </pixiContainer>
          )}
          {crossHair && (
            <Crosshair
              height={height}
              width={width}
              x={crossHair.x}
              y={crossHair.y}
              stroke="hsl(0, 0%, 50%)"
              strokeWidth={1}
            />
          )}
          {Object.entries(data).map(([date, value]) => {
            const x = xScale(date);
            const barWidth = xScale.bandwidth();
            return (
              <Candle
                key={`candle-${date}`}
                x={x ?? 0}
                width={barWidth}
                open={value.open}
                close={value.close}
                high={value.high}
                low={value.low}
                yScale={yScale}
                onMouseEnter={() => {
                  showTooltip({ date, value });
                }}
                onMouseLeave={() => {
                  hideTooltip();
                }}
              />
            );
          })}
        </pixiContainer>
      </Application>
    </div>
  );
}

export default CandleChart;

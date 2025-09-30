import { Application } from "@pixi/react";
import { scaleBand, scaleLinear } from "@visx/scale";
import Bar from "./components/Bar";
import AxisRight from "./components/AxisRight";
import AxisBottom from "./components/AxisBottom";
import GridRows from "./components/GridRows";
import GridColumns from "./components/GridColumns";
import Crosshair from "./components/Crosshair";
import { useState } from "react";
import useTooltipData from "./hooks/useTooltipData";

const data = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": 25,
  "2023-09-04": 90,
};

const height = 500;
const width = 800;
const margin = {
  top: 20,
  bottom: 20,
  left: 60,
  right: 20,
};

function BarChart() {
  const [crossHair, setCrossHair] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const { hideTooltip, showTooltip, tooltipData } = useTooltipData<{
    date: string;
    value: number;
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
      <h2>Bar Chart</h2>
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
                  g.rect(10, 10, 120, 50);
                  g.fill("hsl(0, 0%, 90%)");
                }}
              >
                <pixiText
                  text={`Date: ${tooltipData.date}\nValue: ${tooltipData.value}`}
                  x={15}
                  y={15}
                  style={{
                    fontSize: 14
                  }}
                />
              </pixiGraphics>
            </pixiContainer>
          )}
          {crossHair !== null && (
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
            const y = yScale(value);
            const barWidth = xScale.bandwidth();
            const barHeight = height - margin.bottom - y;
            return (
              <Bar
                key={`bar-${date}`}
                x={(x ?? 0) - barWidth / 2}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="hsl(207, 60%, 50%)"
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

export default BarChart;

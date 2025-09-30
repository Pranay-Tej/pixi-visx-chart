import { Application } from "@pixi/react";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useState } from "react";
import AxisBottom from "./components/AxisBottom";
import AxisRight from "./components/AxisRight";
import Crosshair from "./components/Crosshair";
import GridColumns from "./components/GridColumns";
import GridRows from "./components/GridRows";
import LinePath from "./components/LinePath";

const data = {
  "2023-09-01": 50,
  "2023-09-02": 75,
  "2023-09-03": 25,
  "2023-09-04": 90,
};

const transformedData = Object.entries(data).map(([date, value]) => ({
  date,
  value,
}));

const height = 500;
const width = 800;
const margin = {
  top: 20,
  bottom: 20,
  left: 60,
  right: 20,
};

function LineChart() {
  const [crossHair, setCrossHair] = useState<{
    x: number;
    y: number;
  } | null>(null);
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
      <h2>Line Chart</h2>
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
          <LinePath
            data={transformedData}
            x={(d) => xScale(d.date) ?? 0}
            y={(d) => yScale(d.value)}
          />
        </pixiContainer>
      </Application>
    </div>
  );
}

export default LineChart;

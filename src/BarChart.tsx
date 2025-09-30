import { Application } from "@pixi/react";
import { scaleBand, scaleLinear } from "@visx/scale";
import Bar from "./components/Bar";
import AxisRight from "./components/AxisRight";
import AxisBottom from "./components/AxisBottom";
import GridRows from "./components/GridRows";
import GridColumns from "./components/GridColumns";

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
        <GridRows scale={yScale} width={innerWidth}  />
        <GridColumns scale={xScale} height={innerHeight} />
        <AxisRight scale={yScale} label="Price" width={width} height={height} />
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
            />
          );
        })}
        <AxisBottom scale={xScale} label="Date" width={width} height={height} />

      </Application>
    </div>
  );
}

export default BarChart;

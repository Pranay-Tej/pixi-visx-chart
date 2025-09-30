import "./App.css";

import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
// import TradingChart from "./TradingChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Text,
});

function App() {
  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>PixiJS Test</h1>
      {/* <div style={{
        display: "grid",
        width: "100vw",
        gridTemplateColumns: "200px 1fr"
      }}>
        <ul>
          <li>NIFTY</li>
          <li>BANKNIFTY</li>
        </ul>
        <TradingChart />
      </div> */}
      <div className="centered">
        <BarChart />
      </div>
      <hr />
      <div className="centered">
        <LineChart />
      </div>
    </div>
  );
}

export default App;

import "./App.css";

import { extend } from "@pixi/react";
import { Container, Graphics, Sprite, Text } from "pixi.js";
// import TradingChart from "./TradingChart";
import BarChart from "./BarChart";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Sprite,
  Graphics,
  Text,
});

function App() {
  return (
    <div>
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
      <BarChart />
    </div>
  );
}

export default App;

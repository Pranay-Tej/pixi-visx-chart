import { Application } from "@pixi/react";
import { useRef } from "react";

function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  return (
    // We'll wrap our components with an <Application> component to provide
    // the Pixi.js Application context
    <div ref={chartContainerRef}>
        <Application
        //   resizeTo={chartContainerRef}
          background={"#ffffff"}
        //   width={400}
        //   height={400}
        >
          <pixiContainer>
            <pixiText text="TradingChart canvas Text" style={{
                fill: "hsl(206, 60%, 50%)",
            }}/>
            <pixiGraphics 
                draw={(g) => {
                    g.clear();
                    g.rect(50, 50, 100, 100);
                    g.fill("hsl(207, 60%, 50%)");
                }}
            />
            <pixiGraphics 
                draw={(g) => {
                    g.clear();
                    g.moveTo(200,200);
                    g.lineTo(400, 400)
                    .stroke({ width: 2, color: "hsl(207, 60%, 50%)" });
                }}
            />
          </pixiContainer>
        </Application>
    </div>
  );
}

export default TradingChart;

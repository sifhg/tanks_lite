import { useEffect, useState } from "react";
import { AssetInstance } from "../App";
import { Stage, Layer, Path } from "react-konva";

interface Props {
  instanceMap: Map<string, AssetInstance>;
  selection: string[];
}

function PreviewStage(props: Props) {
  const [windowSize, setWindowSize] = useState<{ w: number; h: number }>({
    w: 50,
    h: 50,
  });
  useEffect(() => {
    const PREVIEW_WINDOW = document.getElementById("preview")!;
    setWindowSize(
      PREVIEW_WINDOW
        ? {
            w: PREVIEW_WINDOW.clientWidth,
            h: PREVIEW_WINDOW.clientHeight,
          }
        : {
            w: 50,
            h: 50,
          }
    );
    new ResizeObserver(() => {
      setWindowSize({
        w: PREVIEW_WINDOW.clientWidth,
        h: PREVIEW_WINDOW.clientHeight,
      });
    }).observe(PREVIEW_WINDOW);
  }, []);

  return (
    <Stage id="preview-canvas" width={windowSize.w} height={windowSize.h}>
      <Layer>
        {/* CREATE A COMPONENT CALLED <Items /> */}
        <Path
          fill="blue"
          stroke={"black"}
          strokeScaleEnabled={false}
          x={200}
          y={200}
          data="M 32 -25 h 55.875 l -10.5 -10.5 q -3.625 2.625 -8.0625 4.0625 T 60 -30 q -4.875 0 -9.3125 -1.5 T 42.625 -35.625 l -10.625 10.625 Z m -7 -7.125 l 10.5 -10.5 q -2.625 -3.625 -4.0625 -8.0625 T 30 -60 q 0 -4.875 1.5 -9.3125 t 4.125 -8.0625 l -10.625 -10.625 v 55.875 Z m 17.75 -17.75 l 10.25 -10.125 l -10.25 -10.125 q -1.375 2.25 -2.0625 4.75 t -0.6875 5.375 q 0 2.875 0.6875 5.375 t 2.0625 4.75 Z m 17.25 9.875 q 2.875 0 5.375 -0.6875 t 4.75 -2.0625 l -10.125 -10.25 l -10.25 10.25 q 2.25 1.375 4.8125 2.0625 T 60 -40 Z m 0 -27.125 l 10.125 -10.125 q -2.25 -1.375 -4.75 -2.0625 t -5.375 -0.6875 q -2.875 0 -5.375 0.6875 T 49.875 -77.25 l 10.125 10.125 Z m 17.25 17.25 q 1.375 -2.25 2.0625 -4.75 t 0.6875 -5.375 q 0 -2.875 -0.6875 -5.4375 T 77.25 -70.25 l -10.125 10.125 l 10.125 10.25 Z m 17.75 17.75 v -55.875 l -10.625 10.625 q 2.625 3.625 4.125 8.0625 t 1.5 9.3125 q 0 4.875 -1.4375 9.3125 T 84.5 -42.625 l 10.5 10.5 Z M 77.375 -84.375 l 10.625 -10.625 H 32.125 l 10.5 10.5 q 3.625 -2.625 8.0625 -4.0625 T 60 -90 q 4.875 0 9.3125 1.5 t 8.0625 4.125 Z M 25 -15 q -4.125 0 -7.0625 -2.9375 T 15 -25 v -70 q 0 -4.125 2.9375 -7.0625 T 25 -105 h 70 q 4.125 0 7.0625 2.9375 T 105 -95 v 70 q 0 4.125 -2.9375 7.0625 T 95 -15 H 25 Z"
        />
      </Layer>
    </Stage>
  );
}

export default PreviewStage;

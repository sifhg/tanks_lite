import { useEffect, useState } from "react";
import { AssetInstance } from "../App";
import { Stage, Layer, Path } from "react-konva";

interface Props {
  instanceMap: Map<string, AssetInstance>;
  selection: string[];
}

function PreviewStage(props: Props) {
  const PARENT_WINDOW = document.getElementById("preview")!;
  const [windowSize, setWindowSize] = useState<{ w: number; h: number }>(
    PARENT_WINDOW
      ? {
          w: PARENT_WINDOW.clientWidth,
          h: PARENT_WINDOW.clientHeight,
        }
      : {
          w: 50,
          h: 50,
        }
  );
  useEffect(() => {
    console.log(document.getElementById("preview"));
    setWindowSize(
      PARENT_WINDOW
        ? {
            w: PARENT_WINDOW.clientWidth,
            h: PARENT_WINDOW.clientHeight,
          }
        : {
            w: 50,
            h: 50,
          }
    );
  }, []);
  //   new ResizeObserver(() => {
  //     setWindowSize({
  //       w: PARENT_WINDOW.clientWidth,
  //       h: PARENT_WINDOW.clientHeight,
  //     });
  //   }).observe(PARENT_WINDOW);

  return (
    <Stage width={windowSize.w} height={windowSize.h}>
      {console.log(windowSize)}
    </Stage>
  );
}

export default PreviewStage;

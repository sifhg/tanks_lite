import { useEffect, useState } from "react";
import { AssetInstance } from "../App";
import { Stage, Layer } from "react-konva";
import StageNavigators from "../function_bundles/StageNavigator";
import InstancePreviews from "./InstancePreviews";
import { AssetConfig, getPath } from "../assets/tank-assets";
import InstanceManipulators, {
  Tool,
} from "../function_bundles/InstanceManipulators";
import Gizmo from "./Gizmo/Gizmo";
import Toolbox from "./Toolbox/Toolbox";
import SelectionBox from "./SelectionBox";

interface PreviewStageProps {
  instanceMap: Map<string, AssetInstance>;
  selection: Set<string>;
  unplacedInstance: AssetConfig | null;
  setAssetInstance: (assetEntries: Map<string, AssetInstance>) => void;
  tool: Tool;
  setTool: (tool: Tool) => void;
}

function PreviewStage(props: PreviewStageProps) {
  const [windowSize, setWindowSize] = useState<{ w: number; h: number }>({
    w: 50,
    h: 50,
  });
  const [zoomFactor, setZoomFactor] = useState<number>(1);
  const [stageOffset, setStageOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [mouseHistory, setMouseHistory] = useState<
    [{ x: number; y: number }, { x: number; y: number }]
  >([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [relativeMousePos, setRelativeMousePos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [mouseInCanvas, setMouseInCanvas] = useState<boolean>(false);

  //Update stage size on first rendering
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
    <>
      <Toolbox
        selectedTool={props.tool}
        setTool={props.setTool}
        zoomFactor={zoomFactor}
        stageOffsetX={stageOffset.x}
        stageOffsetY={stageOffset.y}
        setZoomFactor={setZoomFactor}
        setStageOffset={setStageOffset}
      />
      <Stage
        id="preview-canvas"
        width={windowSize.w}
        height={windowSize.h}
        scale={{ x: zoomFactor, y: zoomFactor }}
        offset={stageOffset}
        onWheel={(event) => {
          event.evt.preventDefault();
          const DIRECTION = Math.sign(event.evt.deltaY);
          const STEP_SIZE = 15;
          if (event.evt.shiftKey) {
            const ZOOM_STEP_SIZE = STEP_SIZE / 200;
            const NEW_ZOOM_FACTOR =
              zoomFactor * (1 + ZOOM_STEP_SIZE * -DIRECTION);
            const MOUSE_POS = event.target
              .getStage()
              ?.getRelativePointerPosition()!;
            StageNavigators.zoom(
              NEW_ZOOM_FACTOR,
              MOUSE_POS.x,
              MOUSE_POS.y,
              zoomFactor,
              setZoomFactor,
              stageOffset,
              setStageOffset
            );
          } else if (event.evt.ctrlKey) {
            const NEW_OFFSET_X =
              stageOffset.x + (STEP_SIZE / zoomFactor) * DIRECTION;
            StageNavigators.offset(
              { x: NEW_OFFSET_X, y: stageOffset.y },
              setStageOffset
            );
          } else {
            const NEW_OFFSET_Y =
              stageOffset.y + (STEP_SIZE / zoomFactor) * DIRECTION;
            StageNavigators.offset(
              { x: stageOffset.x, y: NEW_OFFSET_Y },
              setStageOffset
            );
          }
        }}
        onMouseMove={(event) => {
          const MOUSE_POS = event.target.getStage()?.getPointerPosition()!;
          setRelativeMousePos(
            event.target.getStage()?.getRelativePointerPosition()!
          );
          setMouseHistory([
            { x: MOUSE_POS.x, y: MOUSE_POS.y },
            mouseHistory[0],
          ]);
          if (event.evt.buttons === 4) {
            const DELTA_POS = {
              x: (mouseHistory[1].x - mouseHistory[0].x) / zoomFactor,
              y: (mouseHistory[1].y - mouseHistory[0].y) / zoomFactor,
            };
            StageNavigators.offset(
              {
                x: stageOffset.x + DELTA_POS.x,
                y: stageOffset.y + DELTA_POS.y,
              },
              setStageOffset
            );
          }
          if (
            event.evt.buttons === 1 &&
            !dragPosition &&
            !props.unplacedInstance
          ) {
            setDragPosition(relativeMousePos);
            console.log("Creating selection box.");
          }
        }}
        onMouseUp={(event) => {
          if (props.unplacedInstance) {
            const NEW_INSTANCE: AssetInstance = {
              ...props.unplacedInstance!,
              name: `${props.unplacedInstance.name}-${crypto.randomUUID()}`,
              pos: event.target.getStage()?.getRelativePointerPosition()!,
              isTank: !("path" in props.unplacedInstance),
              relativePath: getPath(props.unplacedInstance.name).map((path) => {
                return InstanceManipulators.data2Vec(path);
              })!,
            };

            InstanceManipulators.addInstances(
              [[NEW_INSTANCE.name, NEW_INSTANCE]],
              props.instanceMap,
              props.setAssetInstance
            );
          }
          setDragPosition(null);
        }}
        onMouseEnter={() => {
          setMouseInCanvas(true);
        }}
        onMouseLeave={() => {
          setMouseInCanvas(false);
        }}
      >
        <Layer>
          <InstancePreviews
            instances={[...props.instanceMap.values()]}
            unplacedInstance={props.unplacedInstance}
            mousePos={relativeMousePos}
            mouseInCanvas={mouseInCanvas}
          />
          <Gizmo
            selection={props.selection}
            instanceMap={props.instanceMap}
            modifier={"scale"}
          />
          {dragPosition ? (
            <SelectionBox
              x0={dragPosition.x}
              y0={dragPosition.y}
              x1={relativeMousePos.x}
              y1={relativeMousePos.y}
            />
          ) : null}
        </Layer>
      </Stage>
    </>
  );
}

export default PreviewStage;

/**
  Select tool:
    - Dragging always makes a selection box.
    - Just clicking selects only that item and deselcts everything else.
    - Shift clicking an item adds that item to the selection.
    - Ctrl clicking an item removes that item from the selection.
    - Release from a drag selects everything that touches the selection box and deselcts everything else.
    - Shift + release from a drag adds the items within the selection box to the selection.
    - Ctrl + release from a drag deselects everything that touches the selection box.
 */

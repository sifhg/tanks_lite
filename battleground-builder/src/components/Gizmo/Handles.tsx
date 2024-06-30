import { Rect, Circle, Group, Path } from "react-konva";
import InstanceManipulators, {
  Tool,
} from "../../function_bundles/InstanceManipulators";
import { MovePath } from "../../assets/icons";
import { useRef, useState } from "react";
import { AssetInstance } from "../../App";

interface HandlesProps {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  tool: Tool;
  zoomFactor: number;
  selection: Set<string>;
  instanceMap: Map<string, AssetInstance>;
  setInstanceMap: (instanceMap: Map<string, AssetInstance>) => void;
  mouseHistory: [
    {
      x: number;
      y: number;
    },
    {
      x: number;
      y: number;
    }
  ];
  fillColour?: string;
  strokeColour?: string;
}

function Hanldes(props: HandlesProps) {
  const COLOURS = {
    fill: props.fillColour ? props.fillColour : "#FFFFFF",
    stroke: props.strokeColour ? props.strokeColour : "#000000",
  };
  const HANDLE_SIZE = 7;

  /**
   * An array of calculated positions for each Handle of the Gizmo.
   *
   * When the positions for the handles are orderes in these indices, the
   * position of a handle that is on the horizontally opposite side will be
   * exactly 1 index away in the array, while a handle that is on the
   * vertically opposite side will be exactly 3 indices away in the array.
   *
   * This consistency is useful when using the scale modifier, as it's used to
   * change the target handle of the drag event, when the user moves the
   * handle past and anchor axis.
   */
  const HANDLE_POSITIONS = [
    { x: props.x0, y: props.y0 },
    { x: props.x1, y: props.y0 },
    { x: (props.x0 + props.x1) / 2, y: props.y0 },
    { x: props.x0, y: props.y1 },
    { x: props.x1, y: props.y1 },
    { x: (props.x0 + props.x1) / 2, y: props.y1 },
    { x: props.x0, y: (props.y0 + props.y1) / 2 },
    { x: props.x1, y: (props.y0 + props.y1) / 2 },
  ];
  const CORNER_POSITIONS = [
    HANDLE_POSITIONS[0],
    HANDLE_POSITIONS[1],
    HANDLE_POSITIONS[3],
    HANDLE_POSITIONS[4],
  ];

  return (
    <>
      {props.tool === "select"
        ? [null]
        : props.tool === "move"
        ? [
            <Path
              data={MovePath}
              x={(props.x0 + props.x1) / 2}
              y={(props.y0 + props.y1) / 2}
              fill={COLOURS.fill}
              opacity={0.75}
              strokeWidth={0.5}
              stroke={"black"}
              scaleX={24 / (960 * props.zoomFactor)}
              scaleY={24 / (960 * props.zoomFactor)}
            />,
            ...[...props.selection].map((key) => {
              const POSITION = props.instanceMap.get(key)!.pos;
              const PATHS = props.instanceMap.get(key)!.relativePath;
              const initialDragPos = useRef({
                instancePos: { ...POSITION },
                mouse: { ...props.mouseHistory[0] },
              });
              return PATHS.map((path, index) => {
                return (
                  <Path
                    key={`move-shadow-${key}-${index}`}
                    data={InstanceManipulators.vec2Data(path)}
                    fillEnabled
                    strokeEnabled={false}
                    draggable
                    x={POSITION.x}
                    y={POSITION.y}
                    onDragStart={() => {
                      initialDragPos.current = {
                        instancePos: { ...POSITION },
                        mouse: { ...props.mouseHistory[0] },
                      };
                    }}
                    onDragMove={(event) => {
                      InstanceManipulators.moveTo(
                        props.selection,
                        initialDragPos.current.instancePos.x -
                          (initialDragPos.current.mouse.x -
                            props.mouseHistory[0].x) /
                            props.zoomFactor,
                        initialDragPos.current.instancePos.y -
                          (initialDragPos.current.mouse.y -
                            props.mouseHistory[0].y) /
                            props.zoomFactor,
                        props.instanceMap,
                        props.setInstanceMap
                      );
                    }}
                  />
                );
              });
            }),
          ]
        : null}
    </>
  );
}

export default Hanldes;

import { Rect, Circle, Group, Path } from "react-konva";
import InstanceManipulators, {
  Tool,
} from "../../function_bundles/InstanceManipulators";
import { MovePath } from "../../assets/icons";
import { useRef, useState } from "react";
import { AssetInstance } from "../../App";
import { PathData } from "./Gizmo";

interface HandlesProps {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  selectedPaths: PathData;
  tool?: Tool;
  moveContent?: (x: number, y: number) => void;
  zoomFactor?: number;
  fillColour?: string;
  strokeColour?: string;
  hoverColour?: string;
  onGizmoActive?: () => any;
  onGizmoPassive?: () => any;
}

function Hanldes(props: HandlesProps) {
  const COLOURS = {
    fill: props.fillColour ? props.fillColour : "#FFFFFF",
    stroke: props.strokeColour ? props.strokeColour : "#000000",
    hover: props.hoverColour ? props.hoverColour : "#D42646",
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
  const handleRefs = {
    handles: HANDLE_POSITIONS.map(() => useRef<any>(null)),
    handleShadows: HANDLE_POSITIONS.map(() => useRef<any>(null)),
  };
  const [dragDifference, setDragDifference] =
    useState<[{ x: number; y: number }, { x: number; y: number }]>();

  return (
    <>
      {props.tool === "select"
        ? [null]
        : props.tool === "move"
        ? [
            <Path
              key={"move-icon"}
              data={MovePath}
              x={(props.x0 + props.x1) / 2}
              y={(props.y0 + props.y1) / 2}
              fill={`${COLOURS.fill}`}
              opacity={1}
              strokeEnabled
              stroke={COLOURS.stroke}
              strokeWidth={1}
              scaleX={24 / (960 * (props.zoomFactor ? props.zoomFactor : 1))}
              scaleY={24 / (960 * (props.zoomFactor ? props.zoomFactor : 1))}
            />,
            ...[...props.selectedPaths].map((path, index) => {
              const PATH =
                typeof path === "string"
                  ? path
                  : InstanceManipulators.vec2Data(
                      path as { x: number; y: number }[]
                    );
              return (
                <Path
                  key={`move-shadow-${index}`}
                  data={PATH}
                  fillEnabled
                  strokeEnabled={false}
                  draggable
                  fill="black"
                  x={0}
                  y={0}
                  onDragStart={(event) => {
                    setDragDifference([
                      {
                        x: event.target.x(),
                        y: event.target.y(),
                      },
                      {
                        x: event.target.x(),
                        y: event.target.y(),
                      },
                    ]);
                  }}
                  onDragMove={(event) => {
                    setDragDifference([
                      {
                        x: event.target.x(),
                        y: event.target.y(),
                      },
                      dragDifference![0],
                    ]);
                    if (props.moveContent) {
                      props.moveContent(
                        dragDifference![0].x - dragDifference![1].x,
                        dragDifference![0].y - dragDifference![1].y
                      );
                    }
                  }}
                />
              );
            }),
          ]
        : null}
    </>
  );
}

export default Hanldes;

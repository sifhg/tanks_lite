import { Rect, Circle, Group, Path } from "react-konva";
import { Tool } from "../../function_bundles/InstanceManipulators";
import { MovePath } from "../../assets/icons";
import { useState } from "react";

interface HandlesProps {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  tool: Tool;
  fillColour?: string;
}

function Hanldes(props: HandlesProps) {
  const FILL_COLOUR = props.fillColour ? props.fillColour : "#FFFFFF";
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
    <Path
      data={MovePath}
      x={(props.x0 + props.x1) / 2}
      y={(props.y0 + props.y1) / 2}
      fill={FILL_COLOUR}
      stroke={"black"}
    />
  );
}

export default Hanldes;

import { Rect } from "react-konva";

interface SelectionBoxProps {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  strokeColour?: string;
  fillColour?: string;
  strokeWidth?: number;
}

function SelectionBox(props: SelectionBoxProps) {
  const STROKE_WIDTH = props.strokeWidth ? props.strokeWidth : 1;
  const COLOURS = {
    fill: props.fillColour
      ? props.fillColour
      : getComputedStyle(document.getElementById("root")!).getPropertyValue(
          "--contrast-light"
        ),
    stroke: props.fillColour
      ? props.fillColour
      : getComputedStyle(document.getElementById("root")!).getPropertyValue(
          "--contrast-dark"
        ),
  };
  return (
    <>
      <Rect
        x={props.x0}
        y={props.y0}
        width={props.x1 - props.x0}
        height={props.y1 - props.y0}
        fill={COLOURS.fill}
        opacity={0.5}
        strokeEnabled={false}
      />
      <Rect
        x={props.x0}
        y={props.y0}
        width={props.x1 - props.x0}
        height={props.y1 - props.y0}
        stroke={COLOURS.stroke}
        strokeWidth={STROKE_WIDTH}
        strokeScaleEnabled={false}
      />
    </>
  );
}

export default SelectionBox;

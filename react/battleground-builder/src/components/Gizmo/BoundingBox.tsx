import { Rect } from "react-konva";

interface BoundingBoxProps {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  strokeColour: string;
  strokeWidth?: number;
}

function BoundingBox(props: BoundingBoxProps) {
  const STROKE_WIDTH = props.strokeWidth ? props.strokeWidth : 2;
  return (
    <Rect
      x={props.x0}
      y={props.y0}
      width={props.x1 - props.x0}
      height={props.y1 - props.y0}
      fillEnabled={false}
      stroke={props.strokeColour}
      strokeWidth={STROKE_WIDTH}
      strokeScaleEnabled={false}
    />
  );
}

export default BoundingBox;

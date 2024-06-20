import { Rect } from "react-konva";

interface BoundingBoxProps {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  strokeColour: string;
}

function BoundingBox(props: BoundingBoxProps) {
  return (
    <Rect
      x={50}
      y={50}
      width={100}
      height={100}
      fillEnabled={false}
      stroke={props.strokeColour}
    />
  );
}

export default BoundingBox;

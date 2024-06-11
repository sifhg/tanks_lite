import { Rect } from "react-konva";

interface BoundingBoxProps {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

function BoundingBox(props: BoundingBoxProps) {
  return <Rect />;
}

export default BoundingBox;

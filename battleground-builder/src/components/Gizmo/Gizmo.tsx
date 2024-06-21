import { Group } from "react-konva";
import BoundingBox from "./BoundingBox";
import InstanceManipulators from "../../function_bundles/InstanceManipulators";
import { AssetInstance } from "../../App";

type Modifier = "select" | "move" | "rotate" | "scale";

interface GizmoProps {
  selection: string[];
  instanceMap: Map<string, AssetInstance>;
  modifier: Modifier;
}
function Gizmo(props: GizmoProps) {
  const COLOURS = {
    info: getComputedStyle(document.getElementById("root")!).getPropertyValue(
      "--info"
    ),
  };

  const BOUNDARIES = InstanceManipulators.getEdges(
    props.selection,
    props.instanceMap
  );
  console.log(BOUNDARIES);

  return !BOUNDARIES ? (
    <></>
  ) : (
    <Group>
      <BoundingBox
        key="bounding-box"
        x0={BOUNDARIES.x0}
        y0={BOUNDARIES.y0}
        x1={BOUNDARIES.x1}
        y1={BOUNDARIES.y1}
        strokeColour={COLOURS.info}
      />
    </Group>
  );
}

export default Gizmo;

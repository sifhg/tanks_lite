import { Group } from "react-konva";
import BoundingBox from "./BoundingBox";
import InstanceManipulators from "../../function_bundles/InstanceManipulators";
import { AssetInstance } from "../../App";

type Modifier = "select" | "move" | "rotate" | "scale";

const COLOURS = {
  info: "#000000",
};
document.addEventListener("DOMContentLoaded", () => {
  const ROOT_STYLES = getComputedStyle(document.documentElement);
  COLOURS.info = ROOT_STYLES.getPropertyValue("--info");
});

interface GizmoProps {
  selection: string[];
  instanceMap: Map<string, AssetInstance>;
  modifier: Modifier;
}
function Gizmo(props: GizmoProps) {
  const BOUNDARIES = InstanceManipulators.getEdges(
    props.selection,
    props.instanceMap
  );

  return !props.selection ? (
    <></>
  ) : (
    <Group>
      <BoundingBox
        key="bounding-box"
        x0={BOUNDARIES!.x0}
        y0={BOUNDARIES!.y0}
        x1={BOUNDARIES!.x1}
        y1={BOUNDARIES!.y1}
      />
    </Group>
  );
}

export default Gizmo;

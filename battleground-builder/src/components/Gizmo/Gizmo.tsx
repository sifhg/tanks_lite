import { Group } from "react-konva";
import BoundingBox from "./BoundingBox";
import InstanceManipulators, {
  Tool,
} from "../../function_bundles/InstanceManipulators";
import { AssetInstance } from "../../App";
import Hanldes from "./Handles";

type Modifier = "select" | "move" | "rotate" | "scale";

interface GizmoProps {
  selection: Set<string>;
  instanceMap: Map<string, AssetInstance>;
  setInstanceMap: (instanceMap: Map<string, AssetInstance>) => void;
  modifier: Modifier;
  tool: Tool;
  zoomFactor: number;
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
}
function Gizmo(props: GizmoProps) {
  const COLOURS = {
    info: getComputedStyle(document.getElementById("root")!).getPropertyValue(
      "--info"
    ),
    constrastLight: getComputedStyle(
      document.getElementById("root")!
    ).getPropertyValue("--contrast-light"),
  };

  const BOUNDARIES = InstanceManipulators.getEdges(
    props.selection,
    props.instanceMap
  );

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
      <Hanldes
        x0={BOUNDARIES.x0}
        y0={BOUNDARIES.y0}
        x1={BOUNDARIES.x1}
        y1={BOUNDARIES.y1}
        tool={props.tool}
        zoomFactor={props.zoomFactor}
        selection={props.selection}
        instanceMap={props.instanceMap}
        setInstanceMap={props.setInstanceMap}
        mouseHistory={props.mouseHistory}
        hoverColour={COLOURS.info}
      />
    </Group>
  );
}

export default Gizmo;

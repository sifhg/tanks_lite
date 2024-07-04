import { Group } from "react-konva";
import BoundingBox from "./BoundingBox";
import InstanceManipulators, {
  Tool,
} from "../../function_bundles/InstanceManipulators";
import Hanldes from "./Handles";

type PathData =
  | Array<String | { x: number; y: number }[]>
  | Set<String | { x: number; y: number }[]>;

interface GizmoProps {
  selectedPaths: PathData;
  tool?: Tool;
  moveContent?: (x: number, y: number) => void;
  rotateContent?: () => void;
  scaleContent?: () => void;
  zoomFactor?: number;
  mouseHistory?: [
    {
      x: number;
      y: number;
    },
    {
      x: number;
      y: number;
    }
  ];
  setActiveGizmo?: (isActive: boolean) => void;
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
        selectedPaths={[
          "M 0 34.466 L -14.804 19.661 L -9.417 14.273 l 5.625 5.625 V 3.708 H -19.898 l 5.625 5.542 l -5.471 5.471 L -34.549 -0.083 l 14.722 -14.721 L -14.44 -9.417 l -5.542 5.542 H -3.792 v -16.19 l -5.625 5.625 l -5.387 -5.387 L 0 -34.632 l 14.804 14.805 L 9.417 -14.44 l -5.625 -5.625 v 16.19 h 16.107 l -5.625 -5.542 l 5.471 -5.471 L 34.549 -0.083 L 19.744 14.721 L 14.357 9.333 l 5.625 -5.625 H 3.792 v 16.107 l 5.542 -5.625 l 5.471 5.471 L 0 34.466 Z",
        ]}
        tool={props.tool}
        moveContent={(x: number, y: number) => {
          InstanceManipulators.move(
            props.selection,
            x,
            y,
            props.instanceMap,
            props.setInstanceMap
          );
        }}
        onGizmoActive={() => {
          if (props.setActiveGizmo) {
            props.setActiveGizmo(true);
          }
        }}
        onGizmoPassive={() => {
          if (props.setActiveGizmo) {
            props.setActiveGizmo(false);
          }
        }}
      />
    </Group>
  );
}

export default Gizmo;
export type { PathData };

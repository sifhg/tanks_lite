import { AssetInstance } from "../App";
import { AssetConfig, getPath } from "../assets/tank-assets";
import InstanceManipulators, {
  Tool,
} from "../function_bundles/InstanceManipulators";
import { Path } from "react-konva";
import SelectionHandlers from "../function_bundles/SelectionHandlers";

interface Props {
  instances: AssetInstance[];
  unplacedInstance: AssetConfig | null;
  mousePos: { x: number; y: number };
  mouseInCanvas: boolean;
  selection: Set<string>;
  setSelection: (selection: Set<string>) => void;
  tool: Tool;
}

function InstancePreviews(props: Props) {
  return (
    <>
      {props.instances.map((instance) => {
        const isTank = "path" in instance ? false : true;
        return (
          <>
            {instance.relativePath.map((path, pathIndex) => {
              return (
                <Path
                  key={`asset-instance-${isTank ? "tank" : "barrier"}-${
                    instance.name
                  }-${pathIndex}`}
                  data={InstanceManipulators.vec2Data(path)}
                  x={instance.pos.x}
                  y={instance.pos.y}
                  fill={isTank ? "green" : "black"}
                  opacity={0.75}
                  stroke={"black"}
                  onClick={(event) => {
                    console.log(event.evt.button === 0);
                    if (props.tool === "select") {
                      if (event.evt.shiftKey) {
                        SelectionHandlers.select(
                          [instance.name],
                          props.selection,
                          props.setSelection
                        );
                      } else if (event.evt.ctrlKey) {
                        SelectionHandlers.deselect(
                          [instance.name],
                          props.selection,
                          props.setSelection
                        );
                      } else {
                        props.setSelection(new Set<string>([instance.name]));
                      }
                    }
                  }}
                />
              );
            })}
          </>
        );
      })}
      {props.unplacedInstance && props.mouseInCanvas ? (
        <Path
          key={"unplaced-instance"}
          x={props.mousePos.x}
          y={props.mousePos.y}
          fillEnabled={false}
          stroke={"green"}
          strokeWidth={2}
          data={getPath(props.unplacedInstance.name)[0]}
        />
      ) : null}
    </>
  );
}

export default InstancePreviews;

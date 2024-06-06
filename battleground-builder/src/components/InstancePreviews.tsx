import { AssetInstance } from "../App";
import { AssetConfig, getPath } from "../assets/tank-assets";
import InstanceManipulators from "../function_bundles/InstanceManipulators";
import { Path } from "react-konva";

interface Props {
  instances: AssetInstance[];
  unplacedInstance: AssetConfig | null;
  mousePos: { x: number; y: number };
  mouseInCanvas: boolean;
}

function InstancePreviews(props: Props) {
  return (
    <>
      {props.instances.map((instance, index) => {
        const isTank = "path" in instance ? false : true;
        return (
          <>
            {instance.relativePath.map((path, pathIndex) => {
              return (
                <Path
                  key={`asset-instance-${
                    isTank ? "tank" : "barrier"
                  }-${index}-${pathIndex}`}
                  data={InstanceManipulators.vec2Data(path)}
                  x={instance.pos.x}
                  y={instance.pos.y}
                  fill={isTank ? "green" : "black"}
                  opacity={0.75}
                  stroke={"black"}
                />
              );
            })}
          </>
        );
      })}
      {props.unplacedInstance && props.mouseInCanvas ? (
        <Path
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

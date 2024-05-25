import { AssetInstance } from "../App";
import { AssetConfig, getPath } from "../assets/tank-assets";
import InstanceManipulators from "../function_bundles/InstanceManipulators";
import { Path } from "react-konva";

interface Props {
  instances: AssetInstance[];
  unplacedInstance: AssetConfig | null;
}

function InstancePreviews(props: Props) {
  return (
    <>
      {props.instances.map((instance, index) => {
        const isTank = "path" in instance ? false : true;
        if (isTank) {
          return null;
        } else {
          return (
            <Path
              key={`asset-instance-barrier-${index}`}
              data={InstanceManipulators.getPath(instance)}
              x={instance.pos.x}
              y={instance.pos.y}
              fill="black"
              opacity={0.75}
              stroke={"black"}
            />
          );
        }
      })}
      {props.unplacedInstance ? (
        <Path
          x={150}
          y={150}
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

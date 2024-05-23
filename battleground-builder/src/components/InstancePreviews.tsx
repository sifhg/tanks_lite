import { AssetInstance } from "../App";
import InstanceManipulators from "../function_bundles/InstanceManipulators";
import { Path } from "react-konva";

interface Props {
  instances: AssetInstance[];
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
    </>
  );
}

export default InstancePreviews;

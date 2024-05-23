import { AssetInstance } from "../App";

interface Props {
  instances: Map<string, AssetInstance>;
}
function InstanceList(props: Props) {
  return (
    <>
      {[...props.instances.entries()].map((entry) => {
        return (
          <details
            className="instance-list-element"
            key={`instance-list-element${entry[0]}`}
          >
            <summary>{entry[0]}</summary>
            <b>Position:</b> {entry[1].pos.x}, {entry[1].pos.y}
          </details>
        );
      })}
    </>
  );
}

export default InstanceList;

import { AssetInstance } from "../App";

interface Props {
  instances: Map<string, AssetInstance>;
}
function InstanceList(props: Props) {
  return (
    <>
      {[...props.instances.entries()].map((entry) => {
        return (
          <details key={`instance-list-element${entry[0]}`}>
            <summary>{entry[0]}</summary>
            <p>More data...</p>
          </details>
        );
      })}
    </>
  );
}

export default InstanceList;

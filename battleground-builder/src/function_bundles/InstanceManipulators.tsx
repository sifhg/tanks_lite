import { AssetInstance } from "../App";
import { DISTANCE_SCALAR, getPath } from "../assets/tank-assets";

const InstanceManipulators = {
  addInstances: (
    instanceEntries: [string, AssetInstance][],
    instanceMap: Map<string, AssetInstance>,
    setInstances: (assetEntries: Map<string, AssetInstance>) => void
  ): void => {
    const NEW_INSTANCES = new Map([...instanceMap.entries()]);
    for (const ENTRY of instanceEntries) {
      NEW_INSTANCES.set(ENTRY[0], ENTRY[1]);
    }
    setInstances(NEW_INSTANCES);
  },
};

export default InstanceManipulators;

import { AssetInstance } from "../App";

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
  getPath: (assetInstance: AssetInstance): string => {
    if ("path" in assetInstance) {
      // Path for barriers
      const PATH = assetInstance.path;
      const DATA =
        "M" +
        PATH.map((position) => {
          return `L ${position.x} ${position.y}`;
        }) +
        "Z";
      return DATA;
    } else {
      // Path for tanks
      return "M20 0 L20 5 L0 5 L0 0 Z";
    }
  },
};

export default InstanceManipulators;

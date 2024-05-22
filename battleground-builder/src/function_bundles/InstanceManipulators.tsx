import { AssetInstance } from "../App";

const InstanceManipulators = {
  addInstances: (
    assetEntries: [string, AssetInstance][],
    assetMap: Map<string, AssetInstance>,
    setAssetInstances: (assetEntries: Map<string, AssetInstance>) => void
  ): void => {
    const NEW_INSTANCES = new Map([...assetMap.entries()]);
    for (const ENTRY of assetEntries) {
      NEW_INSTANCES.set(ENTRY[0], ENTRY[1]);
    }
    setAssetInstances(NEW_INSTANCES);
  },
};

export default InstanceManipulators;

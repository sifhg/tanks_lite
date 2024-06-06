import { AssetInstance } from "../App";
import { DISTANCE_SCALAR, getPath } from "../assets/tank-assets";

const InstanceManipulators = {
  /**
   *
   * @param instanceEntries
   * @param instanceMap
   * @param setInstances
   */
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
  data2Vec: (data: string): { x: number; y: number }[] => {
    const CLEANED_DATA = [...data]
      .filter((char) => {
        return ". -00123456789".includes(char);
      })
      .join("")
      .trim()
      .replace(/\s{2,}/g, " ")
      .split(" ");
    const PATH: { x: number; y: number }[] = [];
    for (let pairIndex = 0; pairIndex < CLEANED_DATA.length; pairIndex += 2) {
      PATH.push({
        x: Number(CLEANED_DATA[pairIndex]),
        y: Number(CLEANED_DATA[pairIndex + 1]),
      });
    }
    return PATH;
  },
  vec2Data: (path: { x: number; y: number }[]): string => {
    let data = `M ${path[0].x} ${path[0].y}`;
    for (const COORDINATE of path.splice(1)) {
      data += `L ${COORDINATE.x} ${COORDINATE.y}`;
    }
    data += "Z";
    return data;
  },
};

export default InstanceManipulators;

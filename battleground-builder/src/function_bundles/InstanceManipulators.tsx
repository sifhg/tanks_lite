import { AssetInstance } from "../App";

type Tool = null | "select" | "move" | "rotate" | "scale";
const InstanceManipulators = {
  /**
   * This function adds an array of asset instances to the instance map.
   * @param instanceEntries An array of entries – consisting of a key string and an asset instance to add to the map
   * @param instanceMap The currect instance map state
   * @param setInstances A function to modify the map state
   */
  addInstances: (
    instanceEntries: [string, AssetInstance][],
    instanceMap: Map<string, AssetInstance>,
    setInstances: (assetEntries: Map<string, AssetInstance>) => void
  ): void => {
    const NEW_INSTANCE_MAP = new Map([...instanceMap.entries()]);
    for (const ENTRY of instanceEntries) {
      NEW_INSTANCE_MAP.set(ENTRY[0], ENTRY[1]);
    }
    setInstances(NEW_INSTANCE_MAP);
  },
  /**
   * This function removes an array of asset instance from the instance map.
   * @param keys An array of keys representing the instances to remove
   * @param instanceMap The current instance map state
   * @param setInstances A function to modify the map state
   */
  removeInstances: (
    keys: string[],
    instanceMap: Map<string, AssetInstance>,
    setInstances: (assetEntries: Map<string, AssetInstance>) => void
  ): void => {
    const NEW_INSTANCE_MAP = new Map([...instanceMap.entries()]);
    for (const KEY of keys) {
      NEW_INSTANCE_MAP.delete(KEY);
    }
    setInstances(NEW_INSTANCE_MAP);
  },
  /**
   * Takes an SVG path data string and returns a corresponding array of vector points.
   * @param data SVG path data string
   * @returns
   */
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
  /**
   * Takes an array of vector points of a shape as an input and returns a data string for an SVG path.
   * @param path Array of vector points.
   * @returns SVG path data string.
   */
  vec2Data: (
    path: { x: number; y: number }[],
    pos?: { x: number; y: number }
  ): string => {
    const POSITION = pos ? pos : { x: 0, y: 0 };
    const INPUT_PATH = [...path];
    let data = `M ${INPUT_PATH[0].x + POSITION.x} ${
      INPUT_PATH[0].y + POSITION.y
    }`;
    for (const COORDINATE of INPUT_PATH.splice(1)) {
      data += `L ${COORDINATE.x + POSITION.x} ${COORDINATE.y + POSITION.y}`;
    }
    data += "Z";
    return data;
  },
  /**
   * Returns an object of the outmost point positions among the instances with given keys.
   * @param keys An array of keys for the items to consider.
   * @param instanceMap The instance map containing the instances on stage.
   * @returns { x0: number; y0: number; x1: number; y1: number }
   */
  getEdges: (
    keys: Set<string>,
    instanceMap: Map<string, AssetInstance>
  ):
    | {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
      }
    | undefined => {
    const KEY_ARRAY = [...keys];
    if (!KEY_ARRAY || KEY_ARRAY.length === 0) {
      return undefined;
    }
    const ALL_POSITIONS = KEY_ARRAY.map((key) => {
      const CENTER = instanceMap.get(key)?.pos!;
      const RELATIVE_POINTS = instanceMap.get(key)?.relativePath.flat()!;
      const ABSOLUTE_POINTS: { x: number; y: number }[] = [];
      RELATIVE_POINTS.forEach((point) => {
        if (isFinite(point.x) && isFinite(point.y)) {
          ABSOLUTE_POINTS.push({
            x: point.x + CENTER.x,
            y: point.y + CENTER.y,
          });
        }
      });
      return ABSOLUTE_POINTS;
    }).flat();
    const Xs: number[] = [];
    const Ys: number[] = [];
    ALL_POSITIONS.forEach((pointPos) => {
      Xs.push(pointPos.x);
      Ys.push(pointPos.y);
    });

    return {
      x0: Math.min(...Xs),
      y0: Math.min(...Ys),
      x1: Math.max(...Xs),
      y1: Math.max(...Ys),
    };
  },
  /**
   * Moves an instance with a specified displacement.
   * @param keys Keys of the instances to move
   * @param offsetX The distance to move the instance along the X-axis
   * @param offsetY The distance to move the instance along the Y-axis
   * @param instanceMap The current instance map state
   * @param setInstances A function to modify the instance map state
   */
  move: (
    keys: Set<string> | string[],
    offsetX: number,
    offsetY: number,
    instanceMap: Map<string, AssetInstance>,
    setInstances: (assetEntries: Map<string, AssetInstance>) => void
  ) => {
    const NEW_INSTANCE_MAP = new Map([...instanceMap.entries()]);
    keys.forEach((key) => {
      const NEW_INSTANCE = NEW_INSTANCE_MAP!.get(key);
      const INITIAL_POSITION = NEW_INSTANCE!.pos;
      NEW_INSTANCE!.pos = {
        x: INITIAL_POSITION.x + offsetX,
        y: INITIAL_POSITION.y + offsetY,
      };
      if (NEW_INSTANCE) {
        NEW_INSTANCE_MAP.set(key, NEW_INSTANCE);
      } else {
        throw new Error(
          `An instance of key "${key} does not exist and cannot be moved."`
        );
      }
    });
    setInstances(NEW_INSTANCE_MAP);
  },
};

export default InstanceManipulators;
export type { Tool };

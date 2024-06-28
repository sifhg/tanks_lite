import { AssetInstance } from "../App";
import { boxBox, boxPolygon } from "intersects";

const SelectionHandlers = {
  /**
   * Checks whether an instance is selected or not.
   * @param key The key of an asset intance
   * @param selection A set of keys of the selected asset instances
   * @returns A boolean value: true if the key is selected, false if not
   */
  isSelected: (key: string, selection: Set<string>): boolean => {
    return selection.has(key);
  },

  select: (
    keys: string[],
    selection: Set<string>,
    setSelection: (selection: Set<string>) => void,
    instanceMap?: Map<string, AssetInstance>
  ) => {
    const NEW_SELECTION = new Set([...selection]);
    for (const KEY of keys) {
      //Checks if an instance corresponding to the key exists
      if (instanceMap) {
        const EXISTING_KEYS = [...instanceMap.keys()];
        if (!EXISTING_KEYS.includes(KEY)) {
          throw new Error(
            `Key "${KEY}" does not exist and cannot be selected.`
          );
        }
      }
      if (SelectionHandlers.isSelected(KEY, selection)) {
        console.warn(
          `Key "${KEY}" is already selected and cannot be selected again.`
        );
      } else {
        NEW_SELECTION.add(KEY);
      }
    }
    setSelection(NEW_SELECTION);
  },
  deselect: (
    keys: string[],
    selection: Set<string>,
    setSelection: (selection: Set<string>) => void,
    instanceMap?: Map<string, AssetInstance>
  ) => {
    const NEW_SELECTION = new Set([...selection]);
    for (const KEY of keys) {
      //Checks if an instance corresponding to the key exists
      if (instanceMap) {
        const EXISTING_KEYS = [...instanceMap.keys()];
        if (!EXISTING_KEYS.includes(KEY)) {
          throw new Error(
            `Key "${KEY}" does not exist and cannot be deselected.`
          );
        }
      }
      if (!SelectionHandlers.isSelected(KEY, selection)) {
        console.warn(`Key "${KEY}" is not selected and cannot be deselected.`);
      } else {
        NEW_SELECTION.delete(KEY);
      }
    }
    setSelection(NEW_SELECTION);
  },
  isInSelectionBox: (
    selectionBoxSpecifications: {
      x0: number;
      y0: number;
      x1: number;
      y1: number;
    },
    instanceMap: Map<string, AssetInstance>,
    keys?: string[]
  ): string[] => {
    const SELECTION_BOX = [
      Math.min(selectionBoxSpecifications.x0, selectionBoxSpecifications.x1),
      Math.min(selectionBoxSpecifications.y0, selectionBoxSpecifications.y1),
      Math.abs(selectionBoxSpecifications.x1 - selectionBoxSpecifications.x0),
      Math.abs(selectionBoxSpecifications.y1 - selectionBoxSpecifications.y0),
    ];
    const KEYS = ((): string[] => {
      if (keys) {
        return keys;
      } else {
        return [...instanceMap.keys()];
      }
    })();

    const INTERSECTIONS: string[] = [];
    for (const KEY of KEYS) {
      const POS = instanceMap.get(KEY)!.pos;
      const RELATIVE_PATHS = instanceMap.get(KEY)!.relativePath;
      let intersection = false;
      for (const PATH of RELATIVE_PATHS) {
        const ABSOLUTE_PATH = PATH.map((point) => {
          return [point.x + POS.x, point.y + POS.y];
        }).flat();
        intersection = boxPolygon(
          SELECTION_BOX[0],
          SELECTION_BOX[1],
          SELECTION_BOX[2],
          SELECTION_BOX[3],
          ABSOLUTE_PATH
        );
        if (intersection) {
          INTERSECTIONS.push(KEY);
          break;
        }
      }
    }
    return ["Hej"];
  },
};

export default SelectionHandlers;

import { AssetInstance } from "../App";
import { boxPolygon } from "intersects";

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
  /**
   * Adds instance keys to the list of selected instances.
   * @param keys An array of keys of the instances to select
   * @param selection A set of the currently selected instances' keys
   * @param setSelection A function for changing the selection state
   * @param instanceMap A Map of the current asset instances
   */
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
  selectOnly: (
    keys: string[],
    setSelection: (selection: Set<string>) => void,
    instanceMap?: Map<string, AssetInstance>
  ) => {
    if (instanceMap) {
      for (const KEY of keys) {
        if (!instanceMap.has(KEY)) {
          throw new Error(
            `Key "${KEY}" does not exist and cannot be selected.`
          );
        }
      }
    }
    setSelection(new Set<string>(keys));
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
      for (const PATH of RELATIVE_PATHS) {
        const ABSOLUTE_PATH = PATH.map((point) => {
          return [point.x + POS.x, point.y + POS.y];
        }).flat();
        if (
          boxPolygon(
            SELECTION_BOX[0],
            SELECTION_BOX[1],
            SELECTION_BOX[2],
            SELECTION_BOX[3],
            ABSOLUTE_PATH
          )
        ) {
          INTERSECTIONS.push(KEY);
          break;
        }
      }
    }
    return INTERSECTIONS;
  },
};

export default SelectionHandlers;

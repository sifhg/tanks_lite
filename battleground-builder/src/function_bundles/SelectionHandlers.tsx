import { AssetInstance } from "../App";

const SelectionHandlers = {
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
};

export default SelectionHandlers;

import { AssetInstance } from "../App";

const SelectionHandlers = {
  isSelected: (key: string, selection: string[]): boolean => {
    return selection.includes(key);
  },
  select: (
    keys: string[],
    selection: string[],
    setSelection: (selection: string[]) => void,
    instanceMap?: Map<string, AssetInstance>
  ) => {
    for (const KEY of keys) {
      //Checks if an instance corresponding to the key exists
      if (instanceMap) {
        const EXISTING_KEYS = [...instanceMap.keys()];
        if (EXISTING_KEYS.includes(KEY)) {
          throw new Error(
            `Key "${KEY}" does not exist and cannot be selected.`
          );
        }
      }
      if (SelectionHandlers.isSelected(KEY, selection)) {
        throw new Error(
          `Key "${KEY}" is already selected and cannot be selected again.`
        );
      }
    }
    setSelection([...selection, ...keys]);
  },
};

import { useEffect } from "react";
import { AssetConfig } from "./assets/tank-assets";
import SelectionHandlers from "./function_bundles/SelectionHandlers";
import { AssetInstance } from "./App";
import { Tool } from "./function_bundles/InstanceManipulators";

function useClearUnplacedInstance(
  setUnplacedInstance: (unplacedInstance: AssetConfig | null) => void
) {
  let isLeftMouseDown: boolean = true;
  useEffect(() => {
    const handleMouseUp = (event: MouseEvent) => {
      if (!event.shiftKey) {
        setUnplacedInstance(null);
      }
      isLeftMouseDown = false;
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [setUnplacedInstance]);
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isLeftMouseDown = true;
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [isLeftMouseDown]);
  useEffect(() => {
    const handleShiftUp = (event: KeyboardEvent) => {
      if (event.key === "Shift" && !isLeftMouseDown) {
        setUnplacedInstance(null);
      }
    };
    window.addEventListener("keyup", handleShiftUp);
    return () => window.removeEventListener("keyup", handleShiftUp);
  }, [setUnplacedInstance]);
}

function useSelectAll(
  keys: string[],
  selection: Set<string>,
  setSelection: (keys: Set<string>) => void,
  instanceMap: Map<string, AssetInstance>
) {
  useEffect(() => {
    const handleSelectAll = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "a") {
        SelectionHandlers.select(keys, selection, setSelection, instanceMap);
      }
    };
    window.addEventListener("keydown", handleSelectAll);
    return () => window.removeEventListener("keydown", handleSelectAll);
  }, [keys, selection, setSelection, instanceMap, SelectionHandlers.select]);
}

function useSelectTool(setActiveTool: (tool: Tool) => void) {
  useEffect(() => {
    const handleToolSelection = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "q":
          setActiveTool("select");
          break;
        case "w":
          setActiveTool("move");
          break;
        case "e":
          setActiveTool("rotate");
          break;
        case "r":
          setActiveTool("scale");
          break;
      }
    };
    window.addEventListener("keypress", handleToolSelection);
    return () => window.removeEventListener("keypress", handleToolSelection);
  }, [setActiveTool]);
}

export { useClearUnplacedInstance, useSelectAll, useSelectTool };

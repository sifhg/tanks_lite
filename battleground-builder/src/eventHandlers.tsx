import { useEffect } from "react";
import { AssetConfig } from "./assets/tank-assets";
import SelectionHandlers from "./function_bundles/SelectionHandlers";
import { AssetInstance } from "./App";

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

function useSelectionBox(
  startDrag: () => void,
  endDrag: () => void,
  dragPos: { x: number; y: number } | null
) {
  let isMouseDown: boolean = false;
  useEffect(() => {
    const handleMouseDown = () => {
      isMouseDown = true;
    };
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [isMouseDown]);
  useEffect(() => {
    const handleMouseUp = () => {
      isMouseDown = false;
      endDrag();
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [isMouseDown, endDrag]);
  useEffect(() => {
    const handleDragging = () => {
      if (isMouseDown && !dragPos) {
        startDrag();
      }
    };
    window.addEventListener("mousemove", handleDragging);
    return () => window.removeEventListener("dragstart", handleDragging);
  }, [isMouseDown, dragPos, startDrag]);
}

export { useClearUnplacedInstance, useSelectAll, useSelectionBox };

import { useEffect } from "react";
import { AssetConfig } from "./assets/tank-assets";

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
  }, []);
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

export { useClearUnplacedInstance };

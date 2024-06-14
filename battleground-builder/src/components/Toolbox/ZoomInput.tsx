import React from "react";
import StageNavigators from "../../function_bundles/StageNavigator";

interface ZoomInputProps {
  zoomFactor: number;
  stageOffsetX: number;
  stageOffsetY: number;
  setZoomFactor: (newZoomFactor: number) => void;
  setStageOffset: (stageOffset: { x: number; y: number }) => void;
}

function ZoomInput(props: ZoomInputProps) {
  const DISPLAY_VALUE = Math.floor(props.zoomFactor * 100);
  const MIN_VALUE = 0.01;
  const MAX_VALUE = 10;

  const STAGE = document.getElementById("preview-canvas");
  if (!STAGE) {
    return null;
  }
  const STAGE_SIZE = {
    w: STAGE.offsetWidth! / props.zoomFactor,
    h: STAGE.offsetHeight! / props.zoomFactor,
  };
  const RELATIVE_STAGE_CENTER = {
    x: props.stageOffsetX + STAGE_SIZE.w / 2,
    y: props.stageOffsetY + STAGE_SIZE.h / 2,
  };
  function validInput(event: React.FormEvent<HTMLInputElement>): boolean {
    const ALLOWED_CHARACTERS = "0123456789";
    const LAST_INPUT: string = [...event.currentTarget.value].pop()!;
    return ALLOWED_CHARACTERS.includes(LAST_INPUT);
  }
  return (
    <>
      <input
        id="zoom-input"
        type="text"
        value={`${DISPLAY_VALUE}%`}
        onClick={(event) => {
          event.currentTarget.value = event.currentTarget.value.split("%")[0];
          event.currentTarget.select();
        }}
        onInputCapture={(event) => {
          event.currentTarget.value = event.currentTarget.value;
          if (!validInput(event)) {
            const LENGTH = event.currentTarget.value.length;
            event.currentTarget.value = event.currentTarget.value.substring(
              0,
              LENGTH - 1
            );
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const NEW_VALUE = Number(event.currentTarget.value) / 100;
            if (NEW_VALUE < MIN_VALUE) {
              StageNavigators.zoom(
                MIN_VALUE,
                RELATIVE_STAGE_CENTER.x,
                RELATIVE_STAGE_CENTER.y,
                props.zoomFactor,
                props.setZoomFactor,
                { x: props.stageOffsetX, y: props.stageOffsetY },
                props.setStageOffset
              );
            } else if (NEW_VALUE > MAX_VALUE) {
              StageNavigators.zoom(
                MAX_VALUE,
                RELATIVE_STAGE_CENTER.x,
                RELATIVE_STAGE_CENTER.y,
                props.zoomFactor,
                props.setZoomFactor,
                { x: props.stageOffsetX, y: props.stageOffsetY },
                props.setStageOffset
              );
            } else {
              StageNavigators.zoom(
                NEW_VALUE,
                RELATIVE_STAGE_CENTER.x,
                RELATIVE_STAGE_CENTER.y,
                props.zoomFactor,
                props.setZoomFactor,
                { x: props.stageOffsetX, y: props.stageOffsetY },
                props.setStageOffset
              );
            }
            event.currentTarget.value = "" + props.zoomFactor * 100;
            event.currentTarget.blur();
          }
        }}
      />
      <button
        onClick={() => {
          StageNavigators.zoom(
            1,
            RELATIVE_STAGE_CENTER.x,
            RELATIVE_STAGE_CENTER.y,
            props.zoomFactor,
            props.setZoomFactor,
            { x: props.stageOffsetX, y: props.stageOffsetY },
            props.setStageOffset
          );
        }}
      >
        Reset
      </button>
    </>
  );
}

export default ZoomInput;

import React from "react";
import StageNavigators from "../../function_bundles/StageNavigator";

interface ZoomInputProps {
  zoomFactor: number;
  setZoomFactor: (newZoomFactor: number) => void;
}

function ZoomInput(props: ZoomInputProps) {
  const DISPLAY_VALUE = Math.floor(props.zoomFactor * 100);
  const MIN_VALUE = 0.01;
  const MAX_VALUE = 10;
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
              props.setZoomFactor(MIN_VALUE);
              props.setZoomFactor(MIN_VALUE);
            } else if (NEW_VALUE > MAX_VALUE) {
              props.setZoomFactor(MAX_VALUE);
            } else {
              props.setZoomFactor(NEW_VALUE);
            }
            event.currentTarget.value = "" + props.zoomFactor * 100;
            event.currentTarget.blur();
          }
        }}
      />
      <button
        onClick={() => {
          props.setZoomFactor(1);
        }}
      >
        Reset
      </button>
    </>
  );
}

export default ZoomInput;

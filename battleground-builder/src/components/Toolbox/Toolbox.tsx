import { Tool } from "../../function_bundles/InstanceManipulators";
import ZoomInput from "./ZoomInput";

interface ToolboxProps {
  selectedTool: Tool;
  setTool: (tool: Tool) => void;
  zoomFactor: number;
  stageOffsetX: number;
  stageOffsetY: number;
  setZoomFactor: (newZoomFactor: number) => void;
  setStageOffset: (stageOffset: { x: number; y: number }) => void;
}

function Toolbox(props: ToolboxProps) {
  return (
    <>
      <div
        id="zoom-select"
        onMouseLeave={(event) => {
          document.getElementById("zoom-input")?.blur();
        }}
      >
        <ZoomInput
          zoomFactor={props.zoomFactor}
          stageOffsetX={props.stageOffsetX}
          stageOffsetY={props.stageOffsetY}
          setZoomFactor={props.setZoomFactor}
          setStageOffset={props.setStageOffset}
        />
      </div>
      <div id="manipulation-tools">
        <button
          className={props.selectedTool === "select" ? "selected tool" : "tool"}
          onClick={() => props.setTool("select")}
        >
          Select
        </button>
        <button
          className={props.selectedTool === "move" ? "selected tool" : "tool"}
          onClick={() => props.setTool("move")}
        >
          Move
        </button>
        <button
          className={props.selectedTool === "rotate" ? "selected tool" : "tool"}
          onClick={() => props.setTool("rotate")}
        >
          Rotate
        </button>
        <button
          className={props.selectedTool === "scale" ? "selected tool" : "tool"}
          onClick={() => props.setTool("scale")}
        >
          Scale
        </button>
      </div>
    </>
  );
}

export default Toolbox;

import { Select, Move, Rotate, Scale } from "../../assets/icons";
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
  const COLOURS = {
    constrastDark: getComputedStyle(
      document.getElementById("root")!
    ).getPropertyValue("--contrast-dark"),
  };
  return (
    <>
      <div
        id="zoom-select"
        onMouseLeave={() => {
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
          <Select
            className="tool-icon"
            fill={
              props.selectedTool === "select" ? COLOURS.constrastDark : null
            }
          />
        </button>
        <button
          className={props.selectedTool === "move" ? "selected tool" : "tool"}
          onClick={() => props.setTool("move")}
        >
          <Move
            className="tool-icon"
            fill={props.selectedTool === "move" ? COLOURS.constrastDark : null}
          />
        </button>
        <button
          className={props.selectedTool === "rotate" ? "selected tool" : "tool"}
          onClick={() => props.setTool("rotate")}
        >
          <Rotate
            className="tool-icon"
            fill={
              props.selectedTool === "rotate" ? COLOURS.constrastDark : null
            }
          />
        </button>
        <button
          className={props.selectedTool === "scale" ? "selected tool" : "tool"}
          onClick={() => props.setTool("scale")}
        >
          <Scale
            className="tool-icon"
            fill={props.selectedTool === "scale" ? COLOURS.constrastDark : null}
          />
        </button>
      </div>
    </>
  );
}

export default Toolbox;

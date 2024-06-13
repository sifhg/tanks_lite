import { Tool } from "../function_bundles/InstanceManipulators";

interface ToolboxProps {
  selectedTool: Tool;
  setTool: (tool: Tool) => void;
  zoomFactor: number;
  setZoomFactor: (newFactor: number) => void;
}

function Toolbox(props: ToolboxProps) {
  return (
    <div className="toolbox">
      <div id="zoom-select">
        <button>Reset</button>
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
    </div>
  );
}

export default Toolbox;

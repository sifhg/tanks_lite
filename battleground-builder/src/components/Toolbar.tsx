import { Tool } from "../function_bundles/InstanceManipulators";

interface ToolbarProps {
  selectedTool: Tool;
  setTool: (tool: Tool) => void;
}

function Toolbar(props: ToolbarProps) {
  return (
    <menu className="toolbar">
      <li>
        <button
          className={props.selectedTool === "select" ? "selected tool" : "tool"}
          onClick={() => props.setTool("select")}
        >
          Select
        </button>
      </li>
      <li>
        <button
          className={props.selectedTool === "move" ? "selected tool" : "tool"}
          onClick={() => props.setTool("move")}
        >
          Move
        </button>
      </li>
      <li>
        <button
          className={props.selectedTool === "rotate" ? "selected tool" : "tool"}
          onClick={() => props.setTool("rotate")}
        >
          Rotate
        </button>
      </li>
      <li>
        <button
          className={props.selectedTool === "scale" ? "selected tool" : "tool"}
          onClick={() => props.setTool("scale")}
        >
          Scale
        </button>
      </li>
    </menu>
  );
}

export default Toolbar;

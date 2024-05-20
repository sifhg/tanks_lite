import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./App.css";
import Titlebar from "./components/Titlebar";

function App() {
  return (
    <>
      <Titlebar tabs={["New", "Save", "Save as", "Load"]} />
      <PanelGroup direction={"horizontal"}>
        <Panel
          className="side-panel"
          id="asset-instance-map"
          defaultSize={25}
          minSize={25}
        >
          Asset instances
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50} minSize={31.25}>
          <PanelGroup direction={"vertical"}>
            <Panel id="preview" defaultSize={75} minSize={50}>
              Preview
            </Panel>
            <PanelResizeHandle />
            <Panel id="asset-map" defaultSize={25} minSize={12.5}>
              Assets
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel
          className="side-panel"
          id="setting-windows"
          defaultSize={25}
          minSize={25}
        >
          Settings
        </Panel>
      </PanelGroup>
    </>
  );
}

export default App;

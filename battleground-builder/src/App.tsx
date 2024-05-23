import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { TankConfig, BarrierConfig } from "./assets/tank-assets";
import "./App.css";
import Titlebar from "./components/Titlebar";
import AssetCards from "./components/AssetCards";
import PreviewStage from "./components/PreviewStage";
import InstanceList from "./components/InstanceList";
import InstanceManipulators from "./function_bundles/InstanceManipulators";

interface TankInstance extends TankConfig {
  pos: { x: number; y: number };
  rotation: number;
}
interface BarrierInstance extends BarrierConfig {
  pos: { x: number; y: number };
  rotation: number;
}
type AssetInstance = TankInstance | BarrierInstance;

function App() {
  addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  addEventListener("mousedown", (event) => {
    if (event.button === 1) {
      event.preventDefault();
    }
  });

  const [assetInstances, setAssetInstances] = useState<
    Map<string, AssetInstance>
  >(
    new Map([
      [
        "tank-0",
        {
          name: "tank-0",
          pos: { x: 50, y: 50 },
          rotation: 0,
          path: [
            { x: 10, y: 10 },
            { x: 10, y: 0 },
            { x: 0, y: 0 },
            { x: 0, y: 10 },
          ],
        },
      ],
    ])
  );

  return (
    <>
      <Titlebar tabs={["New", "Save", "Save as", "Load"]} />
      <PanelGroup id={"panel-region"} direction={"horizontal"}>
        <Panel
          id="asset-instance-map"
          className="panel side-panel"
          defaultSize={12.5}
          minSize={12.5}
        >
          <InstanceList instances={assetInstances} />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50} minSize={31.25}>
          <PanelGroup direction={"vertical"}>
            <Panel id="preview" className="panel" defaultSize={75} minSize={50}>
              <PreviewStage instanceMap={assetInstances} selection={[]} />
            </Panel>
            <PanelResizeHandle />
            <Panel
              id="asset-map"
              className="panel"
              defaultSize={25}
              minSize={12.5}
            >
              <AssetCards />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel
          id="setting-windows"
          className="side-panel panel"
          defaultSize={12.5}
          minSize={12.5}
        >
          Settings
        </Panel>
      </PanelGroup>
    </>
  );
}

export default App;
export type { TankInstance, BarrierInstance, AssetInstance };

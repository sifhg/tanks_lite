import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./App.css";
import Titlebar from "./components/Titlebar";
import AssetCards from "./components/AssetCards";
import { useState } from "react";
import { TankConfig, BarrierConfig } from "./assets/tank-assets";

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
  const [assetInstances, setAssetInstances] = useState<
    Map<string, AssetInstance>
  >(new Map());
  function addInstance(key: string, asset: AssetInstance) {
    const NEW_INSTANCES = new Map([...assetInstances.entries()]);
    NEW_INSTANCES.set(key, asset);
    setAssetInstances(NEW_INSTANCES);
  }

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
          Asset instances
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50} minSize={31.25}>
          <PanelGroup direction={"vertical"}>
            <Panel id="preview" className="panel" defaultSize={75} minSize={50}>
              Preview
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

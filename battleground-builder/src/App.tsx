import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { TankConfig, BarrierConfig, AssetConfig } from "./assets/tank-assets";
import "./App.css";
import Titlebar from "./components/Titlebar";
import AssetCards from "./components/AssetCards";
import PreviewStage from "./components/PreviewStage";
import InstanceList from "./components/InstanceList";

interface TankInstance extends TankConfig {
  isTank: boolean;
  pos: { x: number; y: number };
  relativePath: { x: number; y: number }[][];
}
interface BarrierInstance extends BarrierConfig {
  isTank: boolean;
  pos: { x: number; y: number };
  relativePath: { x: number; y: number }[][];
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
  addEventListener("mouseup", () => {
    setUnplacedInstance(null);
  });

  const [assetInstances, setAssetInstances] = useState<
    Map<string, AssetInstance>
  >(new Map());
  const [unplacedInstance, setUnplacedInstance] = useState<AssetConfig | null>(
    null
  );
  useEffect(() => {
    console.log([...assetInstances.entries()]);
  }, [assetInstances]);

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
              <PreviewStage
                instanceMap={assetInstances}
                selection={[]}
                unplacedInstance={unplacedInstance}
                setAssetInstance={setAssetInstances}
              />
            </Panel>
            <PanelResizeHandle />
            <Panel
              id="asset-map"
              className="panel"
              defaultSize={25}
              minSize={12.5}
            >
              <AssetCards introduceInstance={setUnplacedInstance} />
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

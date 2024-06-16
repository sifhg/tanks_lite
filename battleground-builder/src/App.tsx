// External libraries
import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// Internal components and utilities
import Titlebar from "./components/Titlebar";
import AssetCards from "./components/AssetCards";
import PreviewStage from "./components/PreviewStage";
import InstanceList from "./components/InstanceList";
import { TankConfig, BarrierConfig, AssetConfig } from "./assets/tank-assets";
import InstanceManipulators, {
  Tool,
} from "./function_bundles/InstanceManipulators";
import { useClearUnplacedInstance, useSelectAll } from "./eventHandlers";

// Styling
import "./App.css";

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
  // States
  const [assetInstances, setAssetInstances] = useState<
    Map<string, AssetInstance>
  >(new Map());
  const [unplacedInstance, setUnplacedInstance] = useState<AssetConfig | null>(
    null
  );
  const [selectedInstances, setSelectedInstances] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<Tool>("select");

  // Hooks
  useClearUnplacedInstance(setUnplacedInstance);
  useSelectAll(
    [...assetInstances.keys()],
    selectedInstances,
    setSelectedInstances,
    assetInstances
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
          <InstanceList
            instances={assetInstances}
            selection={selectedInstances}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50} minSize={31.25}>
          <PanelGroup direction={"vertical"}>
            <Panel id="preview" className="panel" defaultSize={75} minSize={50}>
              <PreviewStage
                instanceMap={assetInstances}
                selection={selectedInstances}
                unplacedInstance={unplacedInstance}
                setAssetInstance={setAssetInstances}
                tool={activeTool}
                setTool={setActiveTool}
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

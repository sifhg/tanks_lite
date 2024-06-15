import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { TankConfig, BarrierConfig, AssetConfig } from "./assets/tank-assets";
import InstanceManipulators, {
  Tool,
} from "./function_bundles/InstanceManipulators";
import "./App.css";
import Titlebar from "./components/Titlebar";
import AssetCards from "./components/AssetCards";
import PreviewStage from "./components/PreviewStage";
import InstanceList from "./components/InstanceList";
import SelectionHandlers from "./function_bundles/SelectionHandlers";
import { useClearUnplacedInstance } from "./eventHandlers";

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
  const [assetInstances, setAssetInstances] = useState<
    Map<string, AssetInstance>
  >(new Map());
  const [unplacedInstance, setUnplacedInstance] = useState<AssetConfig | null>(
    null
  );
  const [selection, setSelection] = useState<string[]>([]);
  const [tool, setTool] = useState<Tool>("select");
  useClearUnplacedInstance(setUnplacedInstance);
  useEffect(() => {
    console.log([...assetInstances.keys()]);
    console.log(
      InstanceManipulators.getEdges([...assetInstances.keys()], assetInstances)
    );
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
                tool={tool}
                setTool={setTool}
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

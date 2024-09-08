import { useEffect, useState } from "react";
import { Minimize, Maximize, Restore, Close } from "../assets/icons";

interface Props {
  tabs: string[];
}

type WindowDataType = {
  isMaximized: boolean;
};

function Titlebar(props: Props) {
  const [windowData, setWindowData] = useState<WindowDataType>({
    isMaximized: false,
  });

  window.ipcRenderer.on("window-data", (event, data: WindowDataType) => {
    setWindowData(data);
  });

  function minimizeWindow() {
    window.ipcRenderer.send("window-control", "minimize");
  }
  function maximizeWindow() {
    window.ipcRenderer.send("window-control", "maximize");
  }
  function restoreWindow() {
    window.ipcRenderer.send("window-control", "restore");
  }
  function closeWindow() {
    window.ipcRenderer.send("window-control", "close");
  }

  return (
    <nav className="titlebar">
      {props.tabs.map((tabKey, index) => (
        <div key={"titlebar-tab-" + index} className="titlebar-tab">
          {tabKey}
        </div>
      ))}
      <div className="titlebar-tab filler"></div>
      <div className="titlebar-tab minimizer" onClick={minimizeWindow}>
        <Minimize className="titlebar-tab-icon" />
      </div>
      {windowData.isMaximized ? (
        <div className="titlebar-tab restore" onClick={restoreWindow}>
          <Restore className="titlebar-tab-icon" />
        </div>
      ) : (
        <div className="titlebar-tab maximizer" onClick={maximizeWindow}>
          <Maximize className="titlebar-tab-icon" />
        </div>
      )}

      <div className="titlebar-tab close" onClick={closeWindow}>
        <Close className="titlebar-tab-icon" />
      </div>
    </nav>
  );
}

export default Titlebar;

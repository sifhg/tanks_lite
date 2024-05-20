import React from "react";
import { Minimize, Maximize, Restore, Close } from "../assets/icons";
import minimize from "../assets/minimize_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import maximize from "../assets/maximize_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import restore from "../assets/restore_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import close from "../assets/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";

interface Props {
  tabs: string[];
}

function Titlebar(props: Props) {
  return (
    <nav className="titlebar">
      {props.tabs.map((tabKey, index) => (
        <div key={"titlebar-tab-" + index} className="titlebar-tab">
          {tabKey}
        </div>
      ))}
      <div className="titlebar-tab filler"></div>
      <div className="titlebar-tab minimizer">
        <Minimize className="titlebar-tab-icon" />
      </div>
      <div className="titlebar-tab maximizer">
        <Maximize className="titlebar-tab-icon" />
      </div>
      <div className="titlebar-tab close">
        <Close className="titlebar-tab-icon" />
      </div>
    </nav>
  );
}

export default Titlebar;

import {
  AssetConfig,
  getAssets,
  getPath,
  TankConfig,
  BarrierConfig,
} from "../assets/tank-assets";
import InstanceManipulators from "../function_bundles/InstanceManipulators";

interface Props {
  introduceInstance: (asset: AssetConfig | null) => void;
}

function AssetCards(props: Props) {
  addEventListener("mouseup", () => {
    const SELECTED_ELEMENT = document.getElementsByClassName("adding")[0];
    SELECTED_ELEMENT?.classList.remove("adding");
  });
  const CARD_SIZE = {
    w: 96,
    h: 162,
  };
  return (
    <>
      {getAssets().map((config: TankConfig | BarrierConfig, index: number) => {
        return (
          <div
            key={`asset-card-${config.name}-${index}`}
            className="asset-card"
            style={{ width: CARD_SIZE.w, height: CARD_SIZE.h }}
            onMouseDown={(event) => {
              event.currentTarget.classList.add("adding");
            }}
            onMouseDownCapture={(event) => {
              if (event.button === 0) {
                props.introduceInstance(config);
                console.log(config);
              }
            }}
            onClick={() => {
              props.introduceInstance(null);
            }}
          >
            <svg
              width={CARD_SIZE.w}
              height={CARD_SIZE.h}
              xmlns="http://www.w3.org/2000/svg"
            >
              {"path" in config ? (
                <path
                  transform={`translate(${CARD_SIZE.w / 2}, ${
                    CARD_SIZE.h / 2
                  })`}
                  fill="black"
                  fillOpacity={0.7}
                  stroke="black"
                  d={getPath(index).pop()}
                />
              ) : (
                <path
                  fill="green"
                  fillOpacity={0.7}
                  stroke="black"
                  transform={`translate(${CARD_SIZE.w / 2}, ${
                    CARD_SIZE.h / 2
                  })`}
                  d={getPath(index).shift()}
                />
              )}
              <text
                x={CARD_SIZE.w / 2}
                y="15"
                fontSize="15"
                textAnchor="middle"
                fill="black"
                fontWeight={750}
                fontFamily="inter"
              >
                {config.name}
              </text>
            </svg>
          </div>
        );
      })}
    </>
  );
}

export default AssetCards;

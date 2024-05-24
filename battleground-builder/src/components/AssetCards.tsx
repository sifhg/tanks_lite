import {
  TANK_CONFIGS,
  getPath,
  TankConfig,
  BarrierConfig,
} from "../assets/tank-assets";

function AssetCards() {
  return (
    <>
      {TANK_CONFIGS.map((config, index) => {
        console.log(config.name + "\n" + getPath(config.name)[0]);
        return (
          <svg
            key={`asset-card-${config.name}-${index}`}
            width="96"
            height="128"
            xmlns="http://www.w3.org/2000/svg"
          >
            {"path" in config ? (
              <path
                transform={`translate(${48}, ${64})`}
                fill="black"
                fillOpacity={0.7}
                stroke="black"
                d={getPath(config.name).pop()}
              />
            ) : (
              <path
                fill="green"
                fillOpacity={0.7}
                stroke="black"
                transform={`translate(${48}, ${64})`}
                d={getPath(config.name).shift()}
              />
            )}

            <text
              x="48"
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
        );
      })}
    </>
  );
}

export default AssetCards;

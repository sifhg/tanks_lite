import TANK_CONFIGS from "../assets/tank-assets";

interface Props {}

function AssetCards(props: Props) {
  const DISTANCE_SCALAR = 15.75;
  function getTankDimensions(
    boxSizeX: number,
    boxSizeY: number,
    tankConfig: {
      name: string;
      width: number;
      length: number;
      mass: number;
      maxSpeed: number;
      barrelLength: number;
      shellMass: number;
      wheelWidth: number;
    }
  ) {
    return {
      hull: {
        x: boxSizeX / 2 - (tankConfig.width * DISTANCE_SCALAR) / 2,
        y: boxSizeY / 2 - (tankConfig.length * DISTANCE_SCALAR) / 2,
        w: tankConfig.width * DISTANCE_SCALAR,
        h: tankConfig.length * DISTANCE_SCALAR,
      },
      track0: {
        x:
          boxSizeX / 2 -
          (tankConfig.width * DISTANCE_SCALAR) / 2 -
          tankConfig.wheelWidth * DISTANCE_SCALAR,
        y: boxSizeY / 2 - (tankConfig.length * DISTANCE_SCALAR) / 2,
        w: tankConfig.wheelWidth * DISTANCE_SCALAR,
        h: tankConfig.length * DISTANCE_SCALAR,
      },
      track1: {
        x: boxSizeX / 2 + (tankConfig.width * DISTANCE_SCALAR) / 2,
        y: boxSizeY / 2 - (tankConfig.length * DISTANCE_SCALAR) / 2,
        w: tankConfig.wheelWidth * DISTANCE_SCALAR,
        h: tankConfig.length * DISTANCE_SCALAR,
      },
    };
  }
  return (
    <>
      {TANK_CONFIGS.map((config, index) => {
        let tankDimensions;
        if (!("path" in config)) {
          tankDimensions = getTankDimensions(96, 128, config);
        }

        return (
          <svg
            key={`tank-asset-card-${index}-${config.name}`}
            width="96"
            height="128"
            xmlns="http://www.w3.org/2000/svg"
          >
            {"path" in config ? (
              <>
                <path />
              </>
            ) : (
              <>
                <rect
                  x={tankDimensions?.hull.x}
                  y={tankDimensions?.hull.y}
                  width={tankDimensions?.hull.w}
                  height={tankDimensions?.hull.h}
                  fill="green"
                  fillOpacity={"75%"}
                />
                <rect
                  x={tankDimensions?.track0.x}
                  y={tankDimensions?.track0.y}
                  width={tankDimensions?.track0.w}
                  height={tankDimensions?.track0.h}
                  fill="green"
                  fillOpacity={"60%"}
                />
                <rect
                  x={tankDimensions?.track1.x}
                  y={tankDimensions?.track1.y}
                  width={tankDimensions?.track1.w}
                  height={tankDimensions?.track1.h}
                  fill="green"
                  fillOpacity={"60%"}
                />
                <rect
                  width="100%"
                  height="100%"
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                />
              </>
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

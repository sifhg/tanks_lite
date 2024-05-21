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
    <svg width="96" height="128" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="100%"
        height="100%"
        stroke="black"
        strokeWidth="2"
        fill="none"
      />

      {[TANK_CONFIGS[0]].map((config, index) => {
        const TANK_DIMENSIONS = getTankDimensions(96, 128, config);
        return [
          <rect
            x={TANK_DIMENSIONS.hull.x}
            y={TANK_DIMENSIONS.hull.y}
            width={TANK_DIMENSIONS.hull.w}
            height={TANK_DIMENSIONS.hull.h}
            fill="green"
            fillOpacity={"75%"}
          />,
          <rect
            x={TANK_DIMENSIONS.track0.x}
            y={TANK_DIMENSIONS.track0.y}
            width={TANK_DIMENSIONS.track0.w}
            height={TANK_DIMENSIONS.track0.h}
            fill="green"
            fillOpacity={"60%"}
          />,
          <rect
            x={TANK_DIMENSIONS.track1.x}
            y={TANK_DIMENSIONS.track1.y}
            width={TANK_DIMENSIONS.track1.w}
            height={TANK_DIMENSIONS.track1.h}
            fill="green"
            fillOpacity={"60%"}
          />,
        ];
      })}

      <text
        x="48"
        y="15"
        font-size="15"
        text-anchor="middle"
        fill="black"
        fontWeight={750}
        fontFamily="inter"
      >
        {TANK_CONFIGS[0].name}
      </text>
    </svg>
  );
}

export default AssetCards;

type TankConfig = {
  name: string;
  width: number;
  length: number;
  mass: number;
  maxSpeed: number;
  barrelLength: number;
  shellMass: number;
  wheelWidth: number;
};
type BarrierConfig = {
  name: string;
  path: { x: number; y: number }[];
};
type AssetConfig = TankConfig | BarrierConfig;

const DISTANCE_SCALAR = 15.75;

const TANK_CONFIGS = JSON.stringify([
  {
    name: "Cromwell",
    width: 2.908,
    length: 6.35,
    mass: 27,
    maxSpeed: 16.94,
    barrelLength: 2.82,
    shellMass: 2.72,
    wheelWidth: 0.394,
  },
  {
    name: "KV-2",
    width: 3.35,
    length: 6.67,
    mass: 52,
    maxSpeed: 7.78,
    barrelLength: 3.527,
    shellMass: 51.5,
    wheelWidth: 0.7,
  },
  {
    name: "block-barrier",
    path: [
      { x: 0.5, y: 0.5 },
      { x: -0.5, y: 0.5 },
      { x: -0.5, y: -0.5 },
      { x: 0.5, y: -0.5 },
    ],
  },
  {
    name: "round-barrier",
    path: [
      { x: 1, y: 0 },
      { x: 0.9510565162951535, y: 0.3090169943749474 },
      { x: 0.8090169943749475, y: 0.5877852522924731 },
      { x: 0.5877852522924731, y: 0.8090169943749475 },
      { x: 0.30901699437494745, y: 0.9510565162951535 },
      { x: 6.123233995736766e-17, y: 1 },
      { x: -0.30901699437494734, y: 0.9510565162951536 },
      { x: -0.587785252292473, y: 0.8090169943749475 },
      { x: -0.8090169943749473, y: 0.5877852522924732 },
      { x: -0.9510565162951535, y: 0.3090169943749475 },
      { x: -1, y: 1.2246467991473532e-16 },
      { x: -0.9510565162951536, y: -0.3090169943749473 },
      { x: -0.8090169943749475, y: -0.587785252292473 },
      { x: -0.5877852522924732, y: -0.8090169943749473 },
      { x: -0.30901699437494756, y: -0.9510565162951535 },
      { x: -1.8369701987210297e-16, y: -1 },
      { x: 0.30901699437494723, y: -0.9510565162951536 },
      { x: 0.5877852522924729, y: -0.8090169943749476 },
      { x: 0.8090169943749473, y: -0.5877852522924734 },
      { x: 0.9510565162951535, y: -0.3090169943749477 },
    ],
  },
]);

const ASSET_MAP = new Map<string, AssetConfig>(
  JSON.parse(TANK_CONFIGS).map((config: AssetConfig) => {
    return [config.name, config];
  })
);

function getPathFunction(assetName: string): string[];
function getPathFunction(index: number): string[];
function getPathFunction(input: number | string): string[] {
  let index: number;
  if (typeof input === "number") {
    index = input;
  } else {
    index = getAssets().findIndex((config) => config.name === input);
  }
  const ASSET = getAssets()[index];
  if (ASSET === undefined && typeof input === "string") {
    console.warn(`No asset of name '${input}' exists in tank-assets.ts`);
    return [];
  }

  if ("path" in ASSET) {
    // Path for assets with specified paths
    let path = `M ${ASSET.path[0].x * DISTANCE_SCALAR} ${
      ASSET.path[0].y * DISTANCE_SCALAR
    } `;
    for (const NODE of ASSET.path.splice(1)) {
      path += `L ${NODE.x * DISTANCE_SCALAR} ${NODE.y * DISTANCE_SCALAR} `;
    }
    path += "Z";
    return [path];
  }
  const HULL_DIMENSIONS = {
    w: ASSET.width * DISTANCE_SCALAR,
    h: ASSET.length * DISTANCE_SCALAR,
  };
  const TRACK_WIDTH = ASSET.wheelWidth * DISTANCE_SCALAR;
  const TURRET_CENTER = {
    x: 0,
    y: +HULL_DIMENSIONS.h / 2 - (HULL_DIMENSIONS.h * 2) / 3,
  };

  // Paths for tank assets
  const HULL =
    `M ${HULL_DIMENSIONS.w / 2} ${HULL_DIMENSIONS.h / 2} ` +
    `L ${-HULL_DIMENSIONS.w / 2} ${HULL_DIMENSIONS.h / 2} ` +
    `L ${-HULL_DIMENSIONS.w / 2} ${-HULL_DIMENSIONS.h / 2} ` +
    `L ${HULL_DIMENSIONS.w / 2} ${-HULL_DIMENSIONS.h / 2} Z`;
  const TRACK_0 =
    `M ${-HULL_DIMENSIONS.w / 2} ${HULL_DIMENSIONS.h / 2} ` +
    `L ${-HULL_DIMENSIONS.w / 2 - TRACK_WIDTH} ${HULL_DIMENSIONS.h / 2} ` +
    `L ${-HULL_DIMENSIONS.w / 2 - TRACK_WIDTH} ${-HULL_DIMENSIONS.h / 2} ` +
    `L ${-HULL_DIMENSIONS.w / 2} ${-HULL_DIMENSIONS.h / 2} Z`;
  const TRACK_1 =
    `M ${HULL_DIMENSIONS.w / 2} ${HULL_DIMENSIONS.h / 2} ` +
    `L ${HULL_DIMENSIONS.w / 2 + TRACK_WIDTH} ${HULL_DIMENSIONS.h / 2} ` +
    `L ${HULL_DIMENSIONS.w / 2 + TRACK_WIDTH} ${-HULL_DIMENSIONS.h / 2} ` +
    `L ${HULL_DIMENSIONS.w / 2} ${-HULL_DIMENSIONS.h / 2} Z`;
  const TURRET =
    `M ${HULL_DIMENSIONS.w / 2} ${TURRET_CENTER.y} ` +
    ((R: number): string => {
      let dataLines = "";
      for (let a = 0; a < Math.PI * 2; a += (Math.PI * 2) / 32) {
        dataLines += `L ${Math.cos(a) * R} ${
          Math.sin(a) * R + TURRET_CENTER.y
        } `;
      }
      return dataLines;
    })(HULL_DIMENSIONS.w / 2) +
    "Z";
  return [HULL, TRACK_0, TRACK_1, TURRET];
}
const getPath = getPathFunction;
const getAssets = (): AssetConfig[] => {
  return JSON.parse(TANK_CONFIGS);
};

export type { TankConfig, BarrierConfig, AssetConfig };
export { TANK_CONFIGS, DISTANCE_SCALAR, getPath, getAssets };

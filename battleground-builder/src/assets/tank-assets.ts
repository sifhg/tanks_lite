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

const TANK_CONFIGS: (TankConfig | BarrierConfig)[] = [
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
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
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
];

const ASSET_MAP = new Map<string, TankConfig | BarrierConfig>(
  TANK_CONFIGS.map((config) => {
    return [config.name, config];
  })
);

const getPath = (configName: string): string[] => {
  const ASSET = ASSET_MAP.get(configName)!;
  if ("path" in ASSET) {
    // Path for assets with specified paths
    const PATH =
      "M " +
      ASSET.path.map((position) => {
        return `L ${position.x} ${position.y} `;
      }) +
      "Z";
    return [PATH];
  }
  // Paths for tank assets
  const HULL = "";
  const TRACK_0 = "";
  const TRACK_1 = "";
  const TURRET = "";
  return [HULL, TRACK_0, TRACK_1, TURRET];
};

export type { TankConfig, BarrierConfig };
export { TANK_CONFIGS, getPath };

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
    name: "block",
    path: [
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
    ],
  },
];

export type { TankConfig, BarrierConfig };
export default TANK_CONFIGS;

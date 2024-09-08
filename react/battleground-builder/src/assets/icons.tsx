interface Props {
  className?: string;
  fill?: string | null;
}

//Title bar icons
const MinimizePath = "M240-120v-80h480v80H240Z";
function Minimize(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill={FILL_COLOUR}
    >
      <path d={MinimizePath} />
    </svg>
  );
}
const MaximizePath =
  "M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm0 0v-560 560Z";
function Maximize(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill={FILL_COLOUR}
    >
      <path d={MaximizePath} />
    </svg>
  );
}
const RestorePath =
  "m 203.125,-880 v 130.9375 H 72.1875 V -80 h 676.875 V -210.9375 H 880 V -880 Z m 87.8125,80 H 800 v 509.0625 h -50.9375 v -458.125 H 290.9375 Z M 160,-669.0625 h 509.0625 c 0,169.6875 0,339.375 0,509.0625 H 160 Z";
function Restore(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill={FILL_COLOUR}
    >
      <path d={RestorePath} />
    </svg>
  );
}
const ClosePath =
  "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z";
function Close(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill={FILL_COLOUR}
    >
      <path d={ClosePath} />
    </svg>
  );
}

//Toolbox icons
const SelectPath =
  "M273.3-111.87v-91h91v91h-91ZM111.87-757.13v-91h91v91h-91Zm161.43 0v-91h91v91h-91Zm161.2 645.26v-91h91v91h-91Zm0-645.26v-91h91v91h-91Zm161.43 0v-91h91v91h-91Zm0 645.26v-91h91v91h-91Zm161.2-645.26v-91h91v91h-91ZM111.87-111.87v-91h91v91h-91Zm0-161.43v-91h91v91h-91Zm0-161.2v-91h91v91h-91Zm0-161.43v-91h91v91h-91Zm645.26 484.06v-91h91v91h-91Zm0-161.43v-91h91v91h-91Zm0-161.2v-91h91v91h-91Zm0-161.43v-91h91v91h-91Z";
function Select(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={FILL_COLOUR}
    >
      <path d={SelectPath} />
    </svg>
  );
}
const MovePath =
  "M 0 413.59 L -177.65 235.93 L -113 171.28 l 67.5 67.5 V 44.5 H -238.78 l 67.5 66.5 l -65.65 65.65 L -414.59 -1 l 176.66 -176.65 L -173.28 -113 l -66.5 66.5 H -45.5 v -194.28 l -67.5 67.5 l -64.65 -64.65 L 0 -415.59 l 177.65 177.66 L 113 -173.28 l -67.5 -67.5 v 194.28 h 193.28 l -67.5 -66.5 l 65.65 -65.65 L 414.59 -1 L 236.93 176.65 L 172.28 112 l 67.5 -67.5 H 45.5 v 193.28 l 66.5 -67.5 l 65.65 65.65 L 0 413.59 Z";
function Move(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="-480 -480 960 960"
      width="24px"
      fill={FILL_COLOUR}
    >
      <path d={MovePath} />
    </svg>
  );
}
const RotatePath =
  "M522-69.48v-93q33.28-4.76 65.18-17.52 31.91-12.76 60.67-33.52l64.13 65.65q-42.24 33.44-90.03 53.41-47.8 19.98-99.95 24.98Zm-80 0Q300.65-87.72 207.26-191.49q-93.39-103.77-93.39-243.88 0-75.96 28.5-142.77 28.5-66.82 77.36-116.63 48.86-49.82 114.72-79.03 65.85-29.22 141.57-29.22h5.05l-57.22-57.46 63.65-65.17L655.15-758 487.5-590.35 423.85-654l58.02-58.02h-6.57q-113.89 0-192.16 81.5t-78.27 195.15q0 102.57 67.04 179.99 67.05 77.42 170.09 92.9v93Zm327.98-136.15-65.89-63.89q20.76-28.76 33.52-60.55 12.76-31.78 17.76-65.3h92.76q-5 51.67-24.98 99.23-19.98 47.55-53.17 90.51Zm78.15-269.74h-92.76q-5.24-33.52-18-65.54t-33.52-60.79l66.13-63.17q33.43 40.44 53.03 88.87 19.6 48.43 25.12 100.63Z";
function Rotate(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={FILL_COLOUR}
    >
      <path d={RotatePath} />
    </svg>
  );
}
const ScalePath =
  "M 104.7 -104.7 v -420.8 h 420.8 v 420.8 H 104.7 Z m 496.73 0 v -91 h 82.87 v 91 h -82.87 Z m -450.28 -91.95 H 480 V -440 H 151 Z M 764.3 -275.7 v -82.87 h 91 v 82.87 h -91 Z m 0 -162.87 v -82.86 h 91 v 82.86 h -91 Z M 104.7 -601.43 v -82.87 h 91 v 82.87 h -91 Z m 659.6 0 v -82.87 h 91 v 82.87 h -91 Z M 275.7 -764.3 v -91 h 82.87 v 91 H 275.7 Z m 162.87 0 v -91 h 82.86 v 91 h -82.86 Z m 162.86 0 v -91 h 82.87 v 91 h -82.87 Z m -496.73 0 v -91 h 91 v 91 h -91 Z m 750.6 0 h -91 v -91 h 91 v 91 Z m -91 659.6 v -91 h 91 v 91 h -91 Z";
function Scale(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={FILL_COLOUR}
    >
      <path d={ScalePath} />
    </svg>
  );
}

//Common icons
const ResetPath =
  "M480-320v-100q0-25 17.5-42.5T540-480h100v60H540v100h-60Zm60 240q-25 0-42.5-17.5T480-140v-100h60v100h100v60H540Zm280-240v-100H720v-60h100q25 0 42.5 17.5T880-420v100h-60ZM720-80v-60h100v-100h60v100q0 25-17.5 42.5T820-80H720Zm111-480h-83q-26-88-99-144t-169-56q-117 0-198.5 81.5T200-480q0 72 32.5 132t87.5 98v-110h80v240H160v-80h94q-62-50-98-122.5T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q129 0 226.5 79.5T831-560Z";
function Reset(props: Props) {
  const FILL_COLOUR = props.fill ? props.fill : "currentColor";
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill={FILL_COLOUR}
    >
      <path d={ResetPath} />
    </svg>
  );
}

export {
  MinimizePath,
  Minimize,
  MaximizePath,
  Maximize,
  RestorePath,
  Restore,
  ClosePath,
  Close,
  SelectPath,
  Select,
  MovePath,
  Move,
  RotatePath,
  Rotate,
  ScalePath,
  Scale,
  ResetPath,
  Reset,
};

interface Props {
  className?: string;
}

function Minimize(props: Props) {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill="currentColor"
    >
      <path d="M240-120v-80h480v80H240Z" />
    </svg>
  );
}
function Maximize(props: Props) {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill="currentColor"
    >
      <path d="M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm0 0v-560 560Z" />
    </svg>
  );
}
function Restore(props: Props) {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill="currentColor"
    >
      <path d="m 203.125,-880 v 130.9375 H 72.1875 V -80 h 676.875 V -210.9375 H 880 V -880 Z m 87.8125,80 H 800 v 509.0625 h -50.9375 v -458.125 H 290.9375 Z M 160,-669.0625 h 509.0625 c 0,169.6875 0,339.375 0,509.0625 H 160 Z" />
    </svg>
  );
}
function Close(props: Props) {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 -960 960 960"
      width="18px"
      fill="currentColor"
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}

export { Minimize, Maximize, Restore, Close };

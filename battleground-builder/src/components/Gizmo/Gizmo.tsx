const COLOURS = {
  info: "#000000",
};
document.addEventListener("DOMContentLoaded", () => {
  const ROOT_STYLES = getComputedStyle(document.documentElement);
  COLOURS.info = ROOT_STYLES.getPropertyValue("--info");
});

interface GizmoProps {
  selection: any;
}

function Gizmo(props: GizmoProps) {
  return <BoundingBox />;
}

export default Gizmo;

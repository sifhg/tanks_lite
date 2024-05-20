import "./App.css";
import Titlebar from "./components/Titlebar";

function App() {
  return (
    <>
      <Titlebar tabs={["New", "Save", "Save as", "Load"]} />
    </>
  );
}

export default App;

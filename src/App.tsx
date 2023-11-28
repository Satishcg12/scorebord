
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Link } from "react-router-dom";

function App() {

  return (

    <div className="grid  place-items-center h-screen">
      
      <Link to="/kumites-scoreboard-controller">sb</Link>
        <button onClick={() => invoke("open_scoreboard")}>Play</button>
      
    </div>
  );
}

export default App;

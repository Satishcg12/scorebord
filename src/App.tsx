
import "./App.css";
import { Link } from "react-router-dom";
import { getName } from "@tauri-apps/api/app";
import { useEffect, useState } from "react";

function App() {
  
  const [Name, setName] = useState("Loading...");
  
  const name = async () => {
    const name = await getName();
    setName(name);
  }

  useEffect(() => {
    name();
    
  }, []);

  return (

    <>
      <div className="h-screen w-screen bg-gradient-to-tr from-red-600 to-blue-600 text-white grid place-items-center">
        <div className="capitalize text-center">
          <span className="text-[10vh] font-quikhand font-bold tracking-widest">
            {Name}
          </span>
          <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-2 gap-5">

            <Link to="/kumites-scoreboard-controller" className="text-[5vh] font-quikhand  tracking-widest px-2 border hover:backdrop-blur-lg hover:font-semibold rounded">
              Kumite
            </Link>
            <Link to="/kata-scoreboard-controller" className="text-[5vh] font-quikhand  tracking-widest px-2 border hover:backdrop-blur-lg hover:font-semibold rounded">
              Kata
            </Link>
            </div>
          </div>
        </div>
        <span  className="absolute bottom-0 right-0 text-xl underline font-quikhand font-thin tracking-widest ">
          <a  href="https://github.com/Satishcg12" target="_blank" className="text-2xl">
            By - Satish Chaudhary
          </a>
        </span>
      </div> 
    </>
  );
}

export default App;

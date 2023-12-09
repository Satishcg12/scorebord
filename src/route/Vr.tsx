import { useParams } from "react-router-dom"
import useVRTimerStore from "../store/VRTimer"
import usePlayerStore from "../store/KumiteScoreStore"


const Vr = () => {
    const {id} = useParams()
    const { vrTime } = useVRTimerStore((state) => state)
    const { penalty1, penalty2 } = usePlayerStore((state) => state)
    const penalty = ["C1", "C2", "C3", "HC", "H"]
    return (
        <div className="grid grid-rows-[9] h-screen w-screen bg-black gap-1 text-white text-9xl">
            <div className=" bg-yellow-500 row-span-4 flex flex-col items-center justify-evenly">
                <div >
                    Time &nbsp; 
                {
                    Math.floor(vrTime / 60) < 10 ? "0" + Math.floor(vrTime / 60) : Math.floor(vrTime / 60)
                }:
                {
                    vrTime % 60 < 10 ? "0" + vrTime % 60 : vrTime % 60
                }
                </div>
                <span>
                    VR
                </span>
                
            </div>
            <div className={`  row-span-4 ${id==='1' ? "bg-red-500" : "bg-blue-500"}`}>
                <div className="flex flex-col items-center justify-evenly h-full">
                    <div className="text-9xl font-bold ">
                    Requested
                    </div>
                </div>

                
            </div>
            <div className="grid grid-cols-2">
                <div className="bg-red-500 grid grid-flow-col place-items-center font-bold text-xl ">
                    {penalty.map((p, index) => {
                        return (
                            <div key={index}
                                className={`rounded-full aspect-square h-12 grid place-items-center ${penalty1 >= index + 1 ? "bg-red-400" : ""}`}>

                                {p}
                            </div>
                        )
                    })}
                </div>
                <div className="bg-blue-500 grid grid-flow-col place-items-center font-bold text-xl ">
                    {penalty.map((p, index) => {
                        return (
                            <div key={index}
                                className={`rounded-full aspect-square h-12 grid place-items-center ${penalty2 >= index + 1 ? "bg-blue-400" : ""}`}>

                                {p}
                            </div>
                        )
                    })}

                </div>
            </div>

        </div>
    )
}

export default Vr
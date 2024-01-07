import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import BuzzerSound from "../assets/sounds/Buzzer.mp3"

type Timer = {
    vrTime: number;
    intervalId: NodeJS.Timeout;
    isVrTimerRunning: boolean;
    
    setVrTime: (vrTime: number) => void;
    startVrTimer: () => void;
    stopVrTimer: () => void;
    resetVrTimer: () => void;
};

const Buzzer = new Audio(BuzzerSound);

const useVRTimerStore = create(
    persistNSync<Timer>((set, get) => ({
        vrTime: 3*60,
        intervalId:setInterval(()=>{},100),
        isVrTimerRunning: false,
        setVrTime: (vrTime: number) => {
            set({ vrTime });
        },
        startVrTimer: () => {
            if (!get().isVrTimerRunning) {
                const intervalId = setInterval(() => {
                    const { vrTime } = get();
                    if (vrTime > 0) {
                        set({ vrTime: vrTime - 1 });
                    } else {
                        Buzzer.play();
                        clearInterval(get().intervalId);
                        set({ isVrTimerRunning: false });
                    }
                }, 1000);
                set({ intervalId, isVrTimerRunning: true });
            }
        },
        stopVrTimer: () => {
            clearInterval(get().intervalId);
            set({ isVrTimerRunning: false });
        },
        resetVrTimer: () => {
            clearInterval(get().intervalId);
            set({ vrTime: 3*60, isVrTimerRunning: false });
        },
    }),
    {
        name: "vrTimer",
        
    })
);

export default useVRTimerStore;

import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import BuzzerSound from "../assets/sounds/Buzzer.mp3"
import BeepSound from "../assets/sounds/Beep.mp3"


type Timer = {
    m: number;
    s: number;
    ms: number;

    isRunning: boolean;
    intervalId: NodeJS.Timeout;
    isEditing: boolean;


    setMinutes: (m: number) => void;
    setSeconds: (s: number) => void;
    setMilliseconds: (ms: number) => void;
    setTime: (m: number, s: number) => void;
    start: () => void;
    stop: () => void;
    toggleEdit: () => void;

    setIsEditing: (isEditing: boolean) => void;
    setIsRunning: (isRunning: boolean) => void;
    resetTimer: () => void;

};

const Buzzer = new Audio(BuzzerSound);
const Beep = new Audio(BeepSound);
const useTimerStore = create(
    persistNSync<Timer>((set, get) => ({
        m: 3,
        s: 0,
        ms: 0,
        isRunning: false,
        intervalId:setInterval(()=>{},100),
        isEditing: false,
        setTime: (m: number, s: number) => {
            if(m<0) set({m:0})
            if (s > 60) {
                set({ m: m+1, s: s % 60 });
            } 
            set({m, s });
        },
        start: () => {
            if (!get().isRunning && !get().isEditing) {
                const intervalId = setInterval(() => {
                    const { m, s, ms } = get();
                    if(m===0&&s===15&&ms===0) Beep.play();
                    if (ms > 0) {
                        set({ ms: ms - 1 });
                    } else if (s > 0) {
                        set({ s: s - 1, ms: 9 });
                    } else if (m > 0) {
                        set({ m: m - 1, s: 59, ms: 9 });
                    } else {
                        Buzzer.play();
                        clearInterval(get().intervalId);
                        set({ isRunning: false });
                    }
                }, 100);
                set({ intervalId: intervalId as NodeJS.Timeout, isRunning: true });
            }
        },
        stop: () => {
            if (get().isRunning && !get().isEditing) {
                clearInterval(get().intervalId);
                set({ isRunning: false });
            }
        },
        toggleEdit: () => {
            if (get().isRunning) {
                clearInterval(get().intervalId);
                set({ isRunning: false });
            }
            set({ isEditing: !get().isEditing });
        },
        setIsEditing: (isEditing: boolean) => set({ isEditing }),
        setMinutes: (m: number) =>{
            set({ m });
        },
        setSeconds: (s: number) => {
            if (s >= 60) {
                set({ m: get().m + 1, s: s % 60 ,ms:0});
            } else {
                set({ s ,ms:0});
            }
        },
        setMilliseconds: (ms: number) => set({ ms }),
        setIsRunning: (isRunning: boolean) => set({ isRunning }),
        resetTimer: () => {
            if (get().isRunning) get().stop();
            set({ m: 3, s: 0, ms: 0 });
        },

    }), {
    name: "timer",
    }
    )
);

export default useTimerStore;
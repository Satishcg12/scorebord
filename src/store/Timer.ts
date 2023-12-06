import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import TingTingSound from "../assets/sounds/TingTing.mp3"

type Timer = {
    m: number;
    s: number;
    ms: number;

    isRunning: boolean;
    intervalId: number;
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

const TingTing = new Audio(TingTingSound);
const useTimerStore = create(
    persistNSync<Timer>((set, get) => ({
        m: 0,
        s: 0,
        ms: 0,
        isRunning: false,
        intervalId: 0,
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
                    if (ms > 0) {
                        set({ ms: ms - 1 });
                    } else if (s > 0) {
                        set({ s: s - 1, ms: 9 });
                    } else if (m > 0) {
                        set({ m: m - 1, s: 59, ms: 9 });
                    } else {
                        TingTing.play();
                        clearInterval(get().intervalId);
                        set({ isRunning: false });
                    }
                    if( get().s===14 && get().ms===9){
                        TingTing.play();
                    }
                }, 100);
                set({ intervalId, isRunning: true });
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
            if (!get().isRunning) set({ m: 0, s: 0, ms: 0 });
        },

    }), {
    name: "timer",
    }
    )
);

export default useTimerStore;
import { persistNSync } from "persist-and-sync";
import { create } from "zustand";

type Timer = {
    m: number;
    s: number;
    isRunning: boolean;
    intervalId: number;
    isEditing: boolean;


    setMinutes: (m: number) => void;
    setSeconds: (s: number) => void;
    setTime: (m: number, s: number) => void;
    start: () => void;
    stop: () => void;
    toggleEdit: () => void;

    setIsEditing: (isEditing: boolean) => void;
    setIsRunning: (isRunning: boolean) => void;

};

const useTimerStore = create(
    persistNSync<Timer>((set, get) => ({
        m: 0,
        s: 0,
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
                    if (get().s === 0 && get().m === 0) {
                        clearInterval(get().intervalId);
                        set({ isRunning: false });
                    } else if (get().s === 0) {
                        set({ m: get().m - 1, s: 59 });
                    } else {
                        set({ s: get().s - 1 });
                    }
                }, 1000);
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
        setMinutes: (m: number) => set({ m }),
        setSeconds: (s: number) => {
            if (s >= 60) {
                set({ m: parseInt(`${get().m / 60}`), s: s % 60 });
            } else {
                set({ s });
            }
        },
        setIsRunning: (isRunning: boolean) => set({ isRunning }),

    }), {
    name: "timer",
    }
    )
);

export default useTimerStore;
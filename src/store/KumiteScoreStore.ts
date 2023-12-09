import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import BuzzerSound from "../assets/sounds/Buzzer.mp3"

type Player = {
    
    name1: string;
    name2: string;
    setName2: (name2: string) => void;
    setName1: (name1: string) => void;

    score1: number;
    score2: number;
    addIppon1: () => void;
    addIppon2: () => void;
    addWazaari1: () => void;
    addWazaari2: () => void;
    addYuko1: () => void;
    addYuko2: () => void;
    subtract1: () => void;
    subtract2: () => void;


    // penalty1 must be 0, 1, 2, or 3
    penalty1: number;
    penalty2: number;
    setPenalty1: (penalty1: 0 | 1 | 2 | 3 | 4|5) => void;
    setPenalty2: (penalty2: 0 | 1 | 2 | 3 | 4|5) => void;

    s1: boolean;
    s2: boolean;    
    changeS1: () => void;
    changeS2: () => void;

    penaltyS1: boolean;
    penaltyK1: boolean;
    penaltyS2: boolean;
    penaltyK2: boolean;
    toggleS1: () => void;
    toggleK1: () => void;
    toggleS2: () => void;
    toggleK2: () => void;

    winner: 0 | 1 | 2 ;
    setWinner: (winner: 0|1 | 2) => void;

    category: string;
    setCategory: (category: string) => void;

    timer: number;
    intervalId: number;
    isTimerRunning: boolean;

    setTimer: (timer: number) => void;
    startTimer: () => void;
    stopTimer: () => void;

    hantei: boolean;
    toggleHantei: () => void;

    reset: () => void;


};

const Buzzer = new Audio(BuzzerSound);

const usePlayerStore = create(
    persistNSync<Player>((set, get) => ({
        name1: "",
        name2: "",
        setName1: (name1: string) => set({ name1 }),
        setName2: (name2: string) => set({ name2 }),

        score1: 0,
        score2: 0,
        addIppon1: () => {
            if (get().s1) {
                set({ score1: get().score1 + 3, s1: false });
            } else {
                set({ score1: get().score1 + 3 });
            }
        },
        addIppon2: () => set({ score2: get().score2 + 3 }),
        addWazaari1: () => set({ score1: get().score1 + 2 }),
        addWazaari2: () => set({ score2: get().score2 + 2 }),
        addYuko1: () => set({ score1: get().score1 + 1 }),
        addYuko2: () => set({ score2: get().score2 + 1 }),
        subtract1: () => set({ score1: get().score1 > 0 ? get().score1 - 1 : 0 }),
        subtract2: () => set({ score2: get().score2 > 0 ? get().score2 - 1 : 0 }),
        penalty1: 0,
        penalty2: 0,
        setPenalty1: (penalty1: number) => {            
            
            set({ penalty1 : get().penalty1===penalty1?penalty1-1:penalty1})
        },
        setPenalty2: (penalty2: number) => {
            
            set({ penalty2 : get().penalty2===penalty2?penalty2-1:penalty2})
        },

        s1: false,
        s2: false,
        changeS1: () => set({ s1: !get().s1 , s2: false }),
        changeS2: () => set({ s2: !get().s2 , s1: false }),


        penaltyS1: false,
        penaltyK1: false,
        penaltyS2: false,
        penaltyK2: false,
        toggleS1: () =>{
            if(!get().penaltyS1)Buzzer.play();
            set({ penaltyS1: !get().penaltyS1 })
        },
        toggleK1: () => {
            if(!get().penaltyK1)Buzzer.play();
            set({ penaltyK1: !get().penaltyK1 })
        },
        toggleS2: () => {
            if(!get().penaltyS2)Buzzer.play();
            set({ penaltyS2: !get().penaltyS2 })
        },
        toggleK2: () => {
            if(!get().penaltyK2)Buzzer.play();
            set({ penaltyK2: !get().penaltyK2 })
        },
        
        winner: 0,
        setWinner: (winner: 0 | 1 | 2) => {
            if(winner!==0)Buzzer.play();
            set({ winner });
        },

        category: "",
        setCategory: (category: string) => set({ category }),

        timer: 0,
        intervalId: 0,
        isTimerRunning: false,

        setTimer: (timer: number) => {
            set({ timer });
        },
        startTimer: () => {
            if (!get().isTimerRunning) {

                const intervalId = setInterval(() => {
                    const { timer } = get();
                    if (timer > 0) {
                        set({ timer: timer - 1 });
                    } else {
                        clearInterval(get().intervalId);
                        set({ isTimerRunning: false });
                    }
                }, 1000);
                set({ intervalId , isTimerRunning: true });
            }
        },
        stopTimer: () => {
            if (get().isTimerRunning) {
                clearInterval(get().intervalId);
                set({ isTimerRunning: false });
            }
        },

        hantei: false,
        toggleHantei: () => set({ hantei: !get().hantei }),
        reset: () => set({
            score1: 0,
            score2: 0,
            penalty1: 0,
            penalty2: 0,
            s1: false,
            s2: false,
            penaltyS1: false,
            penaltyK1: false,
            penaltyS2: false,
            penaltyK2: false,
            winner: 0,
            category: "",
            timer: 0,
            intervalId: 0,
            isTimerRunning: false,
            hantei: false,
        
        }),

    })
        , {
            name: "player-storage",
            include:[
                "name1",
                "name2",
                "score1",
                "score2",
                "penalty1",
                "penalty2",
                "penaltyS1",
                "penaltyK1",
                "penaltyS2",
                "penaltyK2",
                "winner",
                "category",
                "timer",
                "s1",
                "s2",
                "hantei"
            ]
        }
    )
);

export default usePlayerStore;

import { persistNSync } from "persist-and-sync";
import { create } from "zustand";
import BuzzerSound from "../assets/sounds/Buzzer.mp3"


type KataScore = {
    aka:boolean;
    name: string;
    division: string;
    kata: string;
    tatami: string;
    numberOfJudges: 3 | 5 | 7;
    scores: number[];
    smallestScoreIndex: number;
    largestScoreIndex: number;
    showScores: boolean;
    totlaScore: number;
    gender?:"male"|"female"|"other";
    category:string;

    setName: (name: string) => void;
    setDivision: (division: string) => void;
    setKata: (kata: string) => void;
    setTatami: (tatami: string) => void;
    setNumberOfJudges: (numberOfJudges: 3 | 5 | 7) => void;
    setScores: (index:number,score: number) => void;
    setGender:(gender: "male"|"female"|"other")=>void;
    setCategory:(category: string)=>void;

    toggleShowScores: () => void;
    toggleAka:()=>void;

    reset: () => void;


    timer: number;
    intervalId: number;
    isTimerRunning: boolean;

    setTimer: (timer: number) => void;
    startTimer: () => void;
    stopTimer: () => void;


};
const Buzzer = new Audio(BuzzerSound);

const useKataScoreStore = create(
    persistNSync<KataScore>((set, get) => ({
        aka:false,
        name: "",
        division: "",
        kata: "1-Anan",
        tatami: "",
        numberOfJudges: 3,
        scores: [5,5,5],
        smallestScoreIndex: 0,
        largestScoreIndex: 0,
        showScores: false,
        totlaScore: 15,
        gender:"male",
        category:"",
        setGender:(gender: "male" | "female" | "other")=>set({gender}),
        setName: (name: string) => set({ name }),
        setDivision: (division: string) => set({ division }),
        setKata: (kata: string) => set({ kata }),
        setTatami: (tatami: string) => set({ tatami }),
        setNumberOfJudges: (numberOfJudges: 3 | 5 | 7) => {
            set({ numberOfJudges, smallestScoreIndex: 0, largestScoreIndex: 0 })
            if (numberOfJudges < get().scores.length) {
                set({ scores: get().scores.slice(0, numberOfJudges) })
            } else {
                let scores = get().scores;
                for (let i = scores.length; i < numberOfJudges; i++) {
                    scores.push(5);
                }
                set({ scores })
            }
            for (let i = 0; i < get().scores.length; i++) {
                if (get().scores[i] < get().scores[get().smallestScoreIndex]) {
                    set({ smallestScoreIndex: i })
                }
                if (get().scores[i] > get().scores[get().largestScoreIndex]) {
                    set({ largestScoreIndex: i })
                }
            }
    },
        toggleShowScores: () => {
            if (!get().showScores) Buzzer.play();
            set({ showScores: !get().showScores })
        },
        setScores: (index:number,score: number) => {
            set({ scores: get().scores.map((s,i) => i === index ? score : s) })
            for (let i = 0; i < get().scores.length; i++) {
                if (get().scores[i] < get().scores[get().smallestScoreIndex]) {
                    set({ smallestScoreIndex: i })
                }
                if (get().scores[i] > get().scores[get().largestScoreIndex]) {
                    set({ largestScoreIndex: i })
                }
            }
        },
        toggleAka:()=>set({aka:!get().aka}),
        setCategory:(category: string)=>set({category}),
        reset: () => set({
            aka:false,
            name: "",
            division: "",
            kata: "1-Anan",
            tatami: "",
            numberOfJudges: 3,
            scores: [5,5,5],
            showScores: false,
            largestScoreIndex: 0,
            smallestScoreIndex: 0,
            
        }),

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
                set({ intervalId, isTimerRunning: true });
            }
        },
        stopTimer: () => {
            if (get().isTimerRunning) {
                clearInterval(get().intervalId);
                set({ isTimerRunning: false });
            }
        },
        

    }), {
        name: "kataScore"
    })
);

export default useKataScoreStore;


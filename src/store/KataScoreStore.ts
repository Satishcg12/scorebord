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

    setName: (name: string) => void;
    setDivision: (division: string) => void;
    setKata: (kata: string) => void;
    setTatami: (tatami: string) => void;
    setNumberOfJudges: (numberOfJudges: 3 | 5 | 7) => void;
    setScores: (index:number,score: number) => void;
    setGender:(gender: "male"|"female"|"other")=>void;

    toggleShowScores: () => void;
    toggleAka:()=>void;

    reset: () => void;

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

    }), {
        name: "kataScore"
    })
);

export default useKataScoreStore;


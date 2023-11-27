import { persistNSync } from "persist-and-sync";
import { create } from "zustand";


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
    setPenalty1: (penalty1: 0 | 1 | 2 | 3 | 4) => void;
    setPenalty2: (penalty2: 0 | 1 | 2 | 3 | 4) => void;

    s1: boolean;
    s2: boolean;    
    changeS1: () => void;
    changeS2: () => void;

    penaltyH1: boolean;
    penaltyS1: boolean;
    penaltyK1: boolean;
    penaltyH2: boolean;
    penaltyS2: boolean;
    penaltyK2: boolean;
    toggleH1: () => void;
    toggleS1: () => void;
    toggleK1: () => void;
    toggleH2: () => void;
    toggleS2: () => void;
    toggleK2: () => void;


    reset: () => void;


};

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
        setPenalty1: (penalty1: number) => set({ penalty1 }),
        setPenalty2: (penalty2: number) => set({ penalty2 }),

        s1: false,
        s2: false,
        changeS1: () => set({ s1: !get().s1 , s2: false }),
        changeS2: () => set({ s2: !get().s2 , s1: false }),


        penaltyH1: false,
        penaltyS1: false,
        penaltyK1: false,
        penaltyH2: false,
        penaltyS2: false,
        penaltyK2: false,
        toggleH1: () => set({ penaltyH1: !get().penaltyH1 }),
        toggleS1: () => set({ penaltyS1: !get().penaltyS1 }),
        toggleK1: () => set({ penaltyK1: !get().penaltyK1 }),
        toggleH2: () => set({ penaltyH2: !get().penaltyH2 }),
        toggleS2: () => set({ penaltyS2: !get().penaltyS2 }),
        toggleK2: () => set({ penaltyK2: !get().penaltyK2 }),
        

        reset: () => set({ score1: 0, score2: 0, penalty1: 0, penalty2: 0, s1: false, s2: false , penaltyH1: false, penaltyS1: false, penaltyK1: false, penaltyH2: false, penaltyS2: false, penaltyK2: false}),

    })
        , {
            name: "player-storage"
        }
    )
);

export default usePlayerStore;

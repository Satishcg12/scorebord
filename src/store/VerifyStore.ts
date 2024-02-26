
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type VerifyStore = {
    username: string;
    setUsername: (name: string) => void;
    productKey: string;
    setProductKey: (key: string) => void;
    isVerified: boolean;
    verify: () => void;
    unVerify: () => void;
    lastVerified: string;
    setLastVerified: (date: string) => void;
    //trial
    isTrial: boolean;
    trialStartDate: string;
    trialOver: boolean; 
    startTrial: (date: string) => void;
    overTrial: () => void;
};

const useVerifyStore = create(persist<VerifyStore>((set) => ({
    username: "",
    setUsername: (name: string) => set({ username: name }),
    productKey: "",
    setProductKey: (key: string) => set({ productKey: key }),
    isVerified: false,
    verify: () => set({ isVerified: true }),
    unVerify: () => set({ isVerified: false , username: "", productKey: "", lastVerified: "" }),
    lastVerified: "",
    setLastVerified: (date: string) => set({ lastVerified: date }),
    isTrial: false,
    trialOver: false,
    trialStartDate: "",
    startTrial: (date: string) => set({ isTrial: true, trialStartDate: date }),
    overTrial: () => set({ isTrial: false, trialOver: true, trialStartDate: "" }),

    
}), {
    name: "verify-store",
    getStorage: () => localStorage,
}));


export default useVerifyStore;

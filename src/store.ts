import { UserPayload } from '@/types';
import { create } from 'zustand';

interface AppState {
    user: UserPayload | null;
    setUser: (userData: UserPayload | null) => void;
}

const useStore = create<AppState>()((set) => ({
    user: null,
    setUser: (user: UserPayload | null) => set({ user }),
}));

export { useStore };
import { create } from 'zustand';

interface ProgressState {
  stars: number;
  badges: string[];
  addStar: () => void;
  awardBadge: (badge: string) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  stars: 0,
  badges: [],
  addStar: () => set((state) => ({ stars: state.stars + 1 })),
  awardBadge: (badge) => set((state) => ({ badges: [...new Set([...state.badges, badge])] })),
}));

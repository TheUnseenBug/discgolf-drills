import { create } from "zustand";
import type { Drill } from "../types/drill";
import supabase from "../services/supabase";

interface DrillStore {
  drills: Drill[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;

  fetchDrills: () => Promise<void>;
  setSelectedCategory: (category: string | null) => void;
  getFilteredDrills: () => Drill[];
}

export const useDrillStore = create<DrillStore>((set, get) => ({
  drills: [],
  selectedCategory: null,
  isLoading: false,
  error: null,

  fetchDrills: async () => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.from("drills").select("*");

    if (error) {
      set({ error: error.message, isLoading: false });
      console.error("Error fetching drills:", error);
    } else {
      set({ drills: data || [], isLoading: false });
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  getFilteredDrills: () => {
    const { drills, selectedCategory } = get();
    if (!selectedCategory) return drills;
    return drills.filter((drill) => drill.category === selectedCategory);
  },
}));

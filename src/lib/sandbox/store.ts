"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FSSnapshot } from "@/lib/terminal/filesystem/types";

interface SandboxState {
  fsSnapshot: FSSnapshot | null;
  history: string[];
  saveSnapshot: (snapshot: FSSnapshot) => void;
  saveHistory: (history: string[]) => void;
  clearSnapshot: () => void;
}

export const useSandboxStore = create<SandboxState>()(
  persist(
    (set) => ({
      fsSnapshot: null,
      history: [],
      saveSnapshot: (snapshot) => set({ fsSnapshot: snapshot }),
      saveHistory: (history) => set({ history }),
      clearSnapshot: () => set({ fsSnapshot: null, history: [] }),
    }),
    {
      name: "tv-sandbox:v1",
    }
  )
);

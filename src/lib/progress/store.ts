"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedLessons: string[];
  currentLesson: string | null;
  streak: { currentCount: number; lastActiveDate: string };
  startedAt: string | null;
  completeLesson: (slug: string) => void;
  setCurrentLesson: (slug: string) => void;
  updateStreak: () => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      currentLesson: null,
      streak: { currentCount: 0, lastActiveDate: "" },
      startedAt: null,

      completeLesson: (slug: string) => {
        const state = get();
        if (state.completedLessons.includes(slug)) return;
        set({
          completedLessons: [...state.completedLessons, slug],
          startedAt: state.startedAt ?? new Date().toISOString(),
        });
        get().updateStreak();
      },

      setCurrentLesson: (slug: string) => {
        set({
          currentLesson: slug,
          startedAt: get().startedAt ?? new Date().toISOString(),
        });
      },

      updateStreak: () => {
        const today = new Date().toISOString().slice(0, 10);
        const state = get();
        const { lastActiveDate, currentCount } = state.streak;

        if (lastActiveDate === today) return;

        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .slice(0, 10);

        if (lastActiveDate === yesterday) {
          set({
            streak: { currentCount: currentCount + 1, lastActiveDate: today },
          });
        } else {
          set({ streak: { currentCount: 1, lastActiveDate: today } });
        }
      },

      reset: () => {
        set({
          completedLessons: [],
          currentLesson: null,
          streak: { currentCount: 0, lastActiveDate: "" },
          startedAt: null,
        });
      },
    }),
    {
      name: "tv-progress:v1",
    }
  )
);

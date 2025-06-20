import { OpenRouterModel } from "@/lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  openRouterApiKey: string | null;
  geminiApiKey: string | null;
  selectedModels: { [key: string]: string };
  availableModels: OpenRouterModel[];
  setOpenRouterApiKey: (key: string | null) => void;
  setGeminiApiKey: (key: string | null) => void;
  setSelectedModel: (chatId: string, model: string) => void;
  setAvailableModels: (models: OpenRouterModel[]) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      openRouterApiKey: null,
      geminiApiKey: null,
      selectedModels: {},
      availableModels: [],
      setOpenRouterApiKey: (key) => set({ openRouterApiKey: key }),
      setGeminiApiKey: (key) => set({ geminiApiKey: key }),
      setSelectedModel: (chatId, model) =>
        set((state) => {
          if (state.selectedModels[chatId] === model) return state;
          return {
            selectedModels: { ...state.selectedModels, [chatId]: model },
          };
        }),
      setAvailableModels: (models) => set({ availableModels: models }),
    }),
    {
      name: "chat-settings",
      partialize: (state) => ({
        openRouterApiKey: state.openRouterApiKey,
        geminiApiKey: state.geminiApiKey,
        selectedModels: state.selectedModels,
      }),
    }
  )
);
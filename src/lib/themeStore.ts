import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { AppTheme, darkTheme, lightTheme } from "../theme/theme";

export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
    themeMode: ThemeMode;
    theme: AppTheme;
    currentMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    loadThemeMode: () => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
    themeMode: "system",
    theme: Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme,
    currentMode: Appearance.getColorScheme() === "dark" ? "dark" : "light",

    loadThemeMode: async () => {
        const saved = await AsyncStorage.getItem("themeMode");

        if (saved === "light" || saved === "dark" || saved === "system") {
            get().setThemeMode(saved as ThemeMode);
        }
    },

    setThemeMode: (mode) => {
        AsyncStorage.setItem("themeMode", mode);

        const system = Appearance.getColorScheme() === "dark" ? "dark" : "light";
        const final = mode === "system" ? system : mode;

        set({
            themeMode: mode,
            theme: final === "dark" ? darkTheme : lightTheme,
            currentMode: final,
        });
    },
}));

// SYSTEM THEME LISTENER
Appearance.addChangeListener((prefs) => {
    const mode = useThemeStore.getState().themeMode;

    if (mode === "system") {
        const final = prefs.colorScheme === "dark" ? "dark" : "light";
        useThemeStore.setState({
            theme: final === "dark" ? darkTheme : lightTheme,
        });
    }
});

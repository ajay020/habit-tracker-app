import { ReactNode, useEffect } from "react";
import { Appearance, View } from "react-native";
import { getSystemTheme, useThemeStore } from "../lib/themeStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const themeMode = useThemeStore((s) => s.themeMode);
    const loadThemeMode = useThemeStore((s) => s.loadThemeMode);

    // Load saved theme on mount
    useEffect(() => {
        loadThemeMode();
    }, []);

    // Apply theme whenever it changes
    useEffect(() => {
        const system = getSystemTheme();
        const final = themeMode === "system" ? system : themeMode;

        // This tells NativeWind to apply dark mode classes
        Appearance.setColorScheme(final);
    }, [themeMode]);

    return (
        <View className="flex-1">
            {children}
        </View>
    );
}

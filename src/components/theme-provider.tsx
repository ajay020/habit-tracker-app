import { ReactNode } from "react";
import { Appearance, View } from "react-native";
import { useThemeStore } from "../lib/themeStore";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const themeMode = useThemeStore((s) => s.themeMode); // "light" | "dark" | "system"
    const system = Appearance.getColorScheme() === "dark" ? "dark" : "light";
    const final = themeMode === "system" ? system : themeMode;

    return (
        <View
            className={final == "dark" ? "dark flex-1" : "flex-1"}>
            {children}
        </View>
    );
}

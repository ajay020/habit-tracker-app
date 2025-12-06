import { useThemeStore } from "@/src/lib/themeStore";
import React from "react";
import { View, ViewStyle } from "react-native";

type CardProps = {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: number;
    className?: string;
};

export default function Card({ children, style, padding, className }: CardProps) {
    const theme = useThemeStore((s) => s.theme);

    return (
        <View
            style={[
                {
                    backgroundColor: theme.card,
                    padding: padding ?? 16,
                    borderRadius: 16,
                    // light & dark shadow
                    shadowColor: "#000",
                    shadowOpacity: theme.name === "dark" ? 0.3 : 0.1,
                    shadowRadius: theme.name === "dark" ? 8 : 4,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: theme.name === "dark" ? 5 : 2,
                },
                style,
            ]}
            className={`${className ?? ""}`}
        >
            {children}
        </View>
    );
}

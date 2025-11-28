import { ThemeProvider } from "@/src/components/theme-provider";
import { initializeDatabase } from "@/src/lib/db";
import { useThemeStore } from "@/src/lib/themeStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    initializeDatabase();
    useThemeStore.getState().loadThemeMode();
  }, []);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </ThemeProvider>
  );
}

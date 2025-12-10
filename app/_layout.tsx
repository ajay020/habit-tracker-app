import { ThemeProvider } from "@/src/components/theme-provider";
import { initializeDatabase } from "@/src/lib/db";
import { useLanguageStore } from "@/src/lib/languageStore";
import { useThemeStore } from "@/src/lib/themeStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  const loadLanguage = useLanguageStore((s) => s.loadLanguage);

  useEffect(() => {
    initializeDatabase();
    useThemeStore.getState().loadThemeMode();
    loadLanguage();
     }, []);

  // LogBox.ignoreLogs([
  //   'expo-notifications: Android Push notifications'
  // ]);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

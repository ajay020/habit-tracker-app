import { initializeDatabase } from "@/src/lib/db";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {

  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

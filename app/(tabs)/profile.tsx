import Card from "@/src/components/card";
import ThemeBottomSheet from "@/src/components/ThemeSheet";
import { useThemeStore } from "@/src/lib/themeStore";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const [themeVisible, setThemeVisible] = useState(false);
  const currentTheme = useThemeStore((s) => s.theme);

  const user = {
    name: "Ajay",
    email: "ajay@example.com",
    avatar: null,
  };

  return (
    <View
      className="flex-1 bg-background dark:bg-background-dark"
    >
      <ScrollView
        className="flex-1 px-4"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        style={{ backgroundColor: currentTheme.background }}
      >
        {/* ----------------------------------------------------
            USER CARD
        ------------------------------------------------------ */}
        <Card className="rounded-2xl p-4 items-center mb-6">
          <Image
            source={
              user.avatar
                ? { uri: user.avatar }
                : require("../../assets/images/icon.png")
            }
            style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 12 }}
          />

          <Text
            style={{ color: currentTheme.text }}
            className="text-xl font-semibold"
          >
            {user.name}
          </Text>

          <Text
            style={{ color: currentTheme.text }}
            className="mt-1"
          >
            {user.email}
          </Text>

          <TouchableOpacity
            className="mt-3 px-4 py-2 rounded-full"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <Text className="text-white font-medium">Edit Profile</Text>
          </TouchableOpacity>
        </Card>

        <View className="bg-background dark:bg-background-dark p-4 rounded-lg">
          <Text className="text-text dark:text-text-dark">Hello Theme!</Text>
        </View>

        {/* ----------------------------------------------------
            SETTINGS SECTIONS
        ------------------------------------------------------ */}
        <SettingsSection
          title="App Settings"
          items={[
            {
              label: "Theme",
              value: currentTheme.name,
              onPress: () => setThemeVisible(true),
            },
            {
              label: "Language",
              value: "English",
              onPress: () => console.log("pressed language"),
            },
            {
              label: "Notifications",
              value: "Enabled",
              onPress: () => { },
            },
            {
              label: "Start Week On",
              value: "Monday",
              onPress: () => { },
            },
          ]}
        />

        <SettingsSection
          title="Habit Settings"
          items={[
            { label: "Reset All Completions", onPress: () => { } },
            { label: "Export Data", onPress: () => { } },
            { label: "Import Data", onPress: () => { } },
          ]}
        />

        {/* ----------------------------------------------------
            FOOTER
        ------------------------------------------------------ */}
        <Text
          style={{ color: currentTheme.text }}
          className="text-center mt-6"
        >
          App Version 1.0.0
        </Text>

      </ScrollView>

      <ThemeBottomSheet
        visible={themeVisible}
        onClose={() => setThemeVisible(false)}
      />
    </View>
  );
}

function SettingsSection({
  title,
  items,
}: {
  title: string;
  items: { label: string; value?: string; onPress: () => void }[];
}) {
  const theme = useThemeStore((s) => s.theme);

  return (
    <View className="mb-6">
      <Text
        className="font-semibold mb-2"
        style={{ color: theme.text }}
      >
        {title}
      </Text>

      <View
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: theme.card }}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            className="p-4 flex-row justify-between border-b"
            style={{
              borderColor: theme.border,
            }}
          >
            <Text style={{ color: theme.text }}>{item.label}</Text>

            {item.value && (
              <Text style={{ color: theme.text }}>{item.value}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}


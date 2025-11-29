import Card from "@/src/components/card";
import { LanguageSelector } from "@/src/components/LanguageSelector";
import ThemeBottomSheet from "@/src/components/ThemeSheet";
import { useTranslation } from "@/src/hooks/userTranslation";
import { useLanguageStore } from "@/src/lib/languageStore";
import { useThemeStore } from "@/src/lib/themeStore";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'de', name: 'Deutsch' },
];

export default function ProfileScreen() {
  const [themeVisible, setThemeVisible] = useState(false);
  const currentTheme = useThemeStore((s) => s.theme);
  const [languageVisible, setLanguageVisible] = useState(false);

  // const { language } = useLanguageStore();
  const { t } = useTranslation();
  const { language, loadLanguage } = useLanguageStore()

  console.log("Language", language)


  useEffect(() => {
    console.log("Current Theme in Profile:", currentTheme.name);
    loadLanguage();
  }, [language]);


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

        {/* ----------------------------------------------------
            SETTINGS SECTIONS
        ------------------------------------------------------ */}
        <SettingsSection
          title="App Settings"
          items={[
            {
              label: t('settings.theme'),
              value: currentTheme.name,
              onPress: () => setThemeVisible(true),
            },
            {
              label: t('settings.language'),
              value: languages.find((l) => l.code === language)?.name || "English",
              onPress: () => {
                setLanguageVisible(true)
              }
            },
            {
              label: t('settings.notification'),
              value: "Enabled",
              onPress: () => { },
            },

          ]}
        />

        {/* ----------------------------------------------------
            FOOTER
        ------------------------------------------------------ */}
        <Text
          className="text-text-dark dark:text-text-dark text-center mt-6"
        >
          App Version 1.0.0
        </Text>

        <ThemeBottomSheet
          visible={themeVisible}
          onClose={() => setThemeVisible(false)}
        />

      </ScrollView>

      {/* LANGUAGE DIALOG */}
      <LanguageSelector visible={languageVisible} onClose={() => setLanguageVisible(false)} />
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


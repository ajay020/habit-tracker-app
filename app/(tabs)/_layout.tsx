import { useThemeStore } from "@/src/lib/themeStore";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
    const insets = useSafeAreaInsets();
    const theme = useThemeStore(s => s.theme)

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: `${theme.background}`,
                    marginBottom: insets.bottom,
                    height: 60 ,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />
                }}
            />

            <Tabs.Screen
                name="stats"
                options={{
                    title: "Stats",
                    tabBarIcon: ({ color }) => <FontAwesome name="bar-chart" size={24} color={color} />
                }}
            />

            <Tabs.Screen
                name="create"
                options={{
                    title: "Add",
                    tabBarIcon: ({ color }) => <FontAwesome name="plus" size={24} color={color} />
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />
                }}
            />
        </Tabs>
    );
}

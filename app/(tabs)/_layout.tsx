import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    backgroundColor: "#fff",
                    borderRadius: 40,
                    marginHorizontal: 16,
                    marginBottom: 20,
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
                name="habits"
                options={{
                    title: "Habits",
                    tabBarIcon: ({ color }) => <FontAwesome name="check-square" size={24} color={color} />
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

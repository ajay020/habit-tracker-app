import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { HABIT_ICONS } from "../constants/icons";

type Props = {
    selectedIcon: string;
    onSelect: (icon: string) => void;
};

export default function IconSelector({ selectedIcon, onSelect }: Props) {
    return (
        <View className="mb-6">
            <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Icon</Text>

            <View className="flex-row flex-wrap">
                {HABIT_ICONS.map((icon) => (
                    <TouchableOpacity
                        key={icon}
                        onPress={() => onSelect(icon)}
                        className={`w-14 h-14 rounded-xl items-center justify-center mr-3 mb-3 border 
                            ${selectedIcon === icon
                                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                : "border-gray-300 dark:border-gray-600"}`}
                    >
                        <Feather
                            name={icon as any}
                            size={24}
                            color={selectedIcon === icon ? "#2563eb" : "#6b7280"}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

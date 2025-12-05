import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
    selectedColor: string;
    onSelect: (color: string) => void;
};

export default function ColorSelector({ selectedColor, onSelect }: Props) {
    return (
        <View className="mb-8">
            <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Color</Text>

            <View className="flex-row flex-wrap">
                {COLORS.map((color) => (
                    <TouchableOpacity
                        key={color}
                        onPress={() => onSelect(color)}
                        className="w-10 h-10 rounded-full mr-3 mb-3"
                        style={{
                            backgroundColor: color,
                            borderWidth: selectedColor === color ? 3 : 1,
                            borderColor: selectedColor === color ? "#000" : "#999",
                        }}
                    />
                ))}
            </View>
        </View>
    );
}

import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Category } from "../types/habit.types";

type Props = {
    categories: Category[];
    selectedCategory: number | null;
    onSelect: (id: number) => void;
};

export default function CategorySelector({ categories, selectedCategory, onSelect }: Props) {
    return (
        <View className="mb-6">
            <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Category</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        onPress={() => onSelect(cat.id)}
                        className={`flex-row items-center mr-3 px-4 py-2 rounded-xl border 
                            ${selectedCategory === cat.id
                                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                : "border-gray-300 dark:border-gray-600"}`}
                    >
                        <Feather
                            name={cat.icon as any}
                            size={18}
                            color={selectedCategory === cat.id ? "#2563eb" : "#6b7280"}
                        />
                        <Text className="pl-2 text-gray-800 dark:text-gray-200">{cat.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

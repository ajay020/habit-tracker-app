import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Category } from "../types/habit.types";
import AddCategoryModal from "./AddCategoryModal";
import Button from "./common/Button";

type Props = {
    categories: Category[];
    selectedCategory: number | null;
    onSelect: (id: number) => void;
};

export default function CategorySelector({ categories, selectedCategory, onSelect }: Props) {
    const [showAddCategory, setShowAddCategory] = useState(false);

    return (
        <View className="mb-6">
            <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Category</Text>
            <View className="flex-row flex-wrap gap-2">
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        onPress={() => onSelect(cat.id)}
                        className={`flex-row items-center px-2 py-2 rounded-xl border 
                            ${selectedCategory === cat.id
                                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                : "border-gray-300 dark:border-gray-600"}`}
                    >
                        <FontAwesome
                            name={cat.icon as any}
                            size={14}
                            color={selectedCategory === cat.id ? "#2563eb" : "#6b7280"}
                        />
                        <Text className=" text-sm pl-2 text-gray-800 dark:text-gray-200">{cat.title}</Text>
                    </TouchableOpacity>
                ))}
                <Button
                    className=" border-y-gray-400 dark:border-x-gray-600"
                    variant="outline"
                    size="sm"
                    label="+"
                    onPress={() => setShowAddCategory(true)}
                />
            </View>
            <AddCategoryModal
                visible={showAddCategory}
                onClose={() => setShowAddCategory(false)}
            />
        </View>
    );
}

import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useCategoryStore } from "../lib/categorySotre";
import { Category } from "../types/habit.types";
import AddCategoryModal from "./AddCategoryModal";
import CategoryActionsModal from "./CategoryActionModal";

type Props = {
    categories: Category[];
    selectedCategory: number | null;
    onSelect: (id: number) => void;
};

export default function CategorySelector({ categories, selectedCategory, onSelect }: Props) {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [categoryForActions, setCategoryForActions] = useState<Category | null>(null);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    const deleteCategory = useCategoryStore((s) => s.deleteCategory);

    return (
        <View className="mb-6">
            <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Category</Text>
            <View className="flex-row flex-wrap gap-2">
                {categories.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        onLongPress={() => {
                            setCategoryForActions(cat)
                            setEditCategory(cat)
                        }}
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
                {/* // Add Category Button */}
                <AddButton onPress={() => setShowAddCategory(true)} />
            </View>
            <AddCategoryModal
                visible={showAddCategory}
                category={editCategory}        // ← null = add mode, object = edit
                onClose={() => {
                    setShowAddCategory(false);
                    setEditCategory(null);
                }}
            />

            {/* EDIT / DELETE DIALOG */}
            <CategoryActionsModal
                visible={!!categoryForActions}
                onClose={() => setCategoryForActions(null)}
                onEdit={() => {
                    setShowAddCategory(true);
                }}
                onDelete={() => {
                    if (categoryForActions) {
                        deleteCategory(categoryForActions?.id!);
                    }
                }}
            />
        </View>
    );
}


const AddButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600"
        >
            <FontAwesome
                name="plus"
                size={14}
                color={"#6b7280"}
            />
        </TouchableOpacity>
    )
}   

import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCategoryStore } from "../lib/categorySotre";
import { Category } from "../types/habit.types";

const ICONS = [
    "folder", "heart", "star", "book", "briefcase", "flag",
    "dollar-sign", "award", "bell", "target", "check-circle",
];

const COLORS = [
    "#ef4444", "#f97316", "#facc15", "#22c55e",
    "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280",
];

type AddCategoryModalProps = {
    visible: boolean;
    onClose: () => void;
    category?: Category | null;
};


export default function AddCategoryModal({ visible, onClose, category }: AddCategoryModalProps) {
    const addCategory = useCategoryStore((s) => s.addCategory);
    const updateCategory = useCategoryStore((s) => s.updateCategory);

    const [title, setTitle] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("folder");
    const [selectedColor, setSelectedColor] = useState("#3b82f6");

    // Pre-fill when editing 
    useEffect(() => {


        if (category) {
            setTitle(category.title);
            setSelectedIcon(category.icon);
        } else {
            setTitle("");
            setSelectedIcon("folder");
        }
    }, [category]);

    const resetState = () => {
        setTitle("");
        setSelectedIcon("folder");
        setSelectedColor("#3b82f6");
    };

    const handleSave = async () => {
        if (!title.trim()) return;

        if (category) {
            //  EDIT MODE
            await updateCategory(category.id, {
                title,
                icon: selectedIcon,
            });
        } else {
            //  ADD MODE
            await addCategory({
                title,
                icon: selectedIcon,
                color: selectedColor,
            });

            resetState();
        }

        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            {/* Backdrop */}
            <TouchableOpacity
                className="flex-1 bg-black/40"
                activeOpacity={1}
                onPress={onClose}
            />

            {/* Bottom Sheet */}
            <View className="absolute bottom-0 left-0 right-0 top-0 bg-white dark:bg-gray-900 rounded-t-2xl p-6 shadow-xl">
                <Text className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {category ? "Edit Category" : "Add Category"}
                </Text>

                <ScrollView className="max-h-[100%]" showsVerticalScrollIndicator={false}>

                    {/* Title */}
                    <Text className="text-text dark:text-text-dark mb-1">Name</Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="e.g., Fitness"
                        placeholderTextColor="#888"
                        className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4
                       text-text dark:text-text-dark"
                    />

                    {/* Icon Picker */}
                    <Text className="text-text dark:text-text-dark mb-2">Icon</Text>
                    <View className="flex-row flex-wrap mb-4">
                        {ICONS.map((icon) => (
                            <TouchableOpacity
                                key={icon}
                                onPress={() => setSelectedIcon(icon)}
                                className={`w-14 h-14 rounded-xl items-center justify-center mr-3 mb-3 border
                  ${selectedIcon === icon
                                        ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                        : "border-gray-300 dark:border-gray-600"}`}
                            >
                                <Feather name={icon as any} size={24} color="#333" />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Color Picker */}
                    <Text className="text-text dark:text-text-dark mb-2">Color</Text>
                    <View className="flex-row flex-wrap mb-4">
                        {COLORS.map((color) => (
                            <TouchableOpacity
                                key={color}
                                onPress={() => setSelectedColor(color)}
                                className={`w-10 h-10 rounded-full mr-3 mb-3 border-2
                  ${selectedColor === color ? "border-black dark:border-white" : "border-transparent"}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </View>

                    {/* Buttons */}
                    <TouchableOpacity
                        className="bg-primary py-3 rounded-xl mt-2"
                        onPress={handleSave}
                    >
                       <Text className="text-center text-white text-base">
                            {category ? "Save Changes" : "Add Category"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="border border-gray-400 dark:border-gray-600 py-3 rounded-xl mt-3"
                        onPress={onClose}
                    >
                        <Text className="text-center text-text dark:text-text-dark font-semibold text-lg">
                            Cancel
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </Modal>
    );
}

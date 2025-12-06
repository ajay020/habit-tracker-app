import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type ChipButtonProps = {
    title?: string;
    icon: string;
    onPress: () => void;
    selected: boolean;
}

const ChipButton = (
    { title, icon, onPress, selected }: ChipButtonProps
) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center px-2 py-2 rounded-xl border 
                            ${selected
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                    : "border-gray-300 dark:border-gray-600"}`}
        >
            <FontAwesome
                name={icon as any}
                size={14}
                color={selected ? "#2563eb" : "#6b7280"}
            />
            <Text className=" text-sm pl-2 text-gray-800 dark:text-gray-200">{title}</Text>
        </TouchableOpacity>
    )
}

export default ChipButton;
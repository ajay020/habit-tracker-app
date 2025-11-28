import React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string; // allow extra Tailwind classes
}

const variantClasses = {
    primary: "bg-primary dark:bg-primary-dark",
    secondary: "bg-card dark:bg-card-dark",
    outline: "border border-primary dark:border-primary-dark bg-transparent",
};

const varientTextClasses = {
    primary: "text-white dark:text-text-dark",
    secondary: "text-text dark:text-text-dark",
    outline: "text-primary dark:text-primary-dark",
}

const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
};

export default function Button({
    label,
    onPress,
    variant = "primary",
    size = "md",
    className,
}: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            className={
                `rounded-lg items-center justify-center
                 ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`
            }
        >
            <Text className={
                `${varientTextClasses[variant]}font-semibold `}>
                {label}
            </Text>
        </Pressable>
    );
}

import React from "react";
import {
    Animated,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { useThemeStore } from "../lib/themeStore";

const themes = [
    { key: "system", label: "System Default" },
    { key: "light", label: "Light Mode" },
    { key: "dark", label: "Dark Mode" },
] as const;

export default function ThemeBottomSheet({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) {
    const themeMode = useThemeStore((s) => s.themeMode);
    const setThemeMode = useThemeStore((s) => s.setThemeMode);

    const slideAnim = React.useRef(new Animated.Value(300)).current;

    React.useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : 300,
            duration: visible ? 240 : 180,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const handleSelect = (mode: "light" | "dark" | "system") => {
        setThemeMode(mode);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            {/* Backdrop */}
            <Pressable className="flex-1 bg-black/40" onPress={onClose} />

            {/* Bottom Sheet */}
            <Animated.View
                style={{
                    transform: [{ translateY: slideAnim }],
                }}
                className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl p-4 pb-8"
            >
                {/* Header */}
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Select Theme
                </Text> 

                {/* Options */}
                {themes.map((t) => (
                    <TouchableOpacity
                        key={t.key}
                        onPress={() => handleSelect(t.key)}
                        activeOpacity={0.7}
                        className="flex-row justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
                    >
                        <Text className="text-gray-800 dark:text-gray-200 text-lg">
                            {t.label}
                        </Text>

                        {themeMode === t.key && (
                            <Text className="text-blue-600 dark:text-blue-400 text-lg font-bold">
                                ✔
                            </Text>
                        )}
                    </TouchableOpacity>
                ))}

                {/* Cancel Button */}
                <TouchableOpacity
                    onPress={onClose}
                    activeOpacity={0.8}
                    className="mt-4 p-4 rounded-xl bg-gray-200 dark:bg-gray-700"
                >
                    <Text className="text-center text-gray-900 dark:text-white font-semibold">
                        Cancel
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
}

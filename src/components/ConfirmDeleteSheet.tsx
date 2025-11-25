import React from "react";
import { Animated, Modal, Text, TouchableOpacity } from "react-native";

export default function ConfirmDeleteSheet({
    visible,
    onCancel,
    onConfirm,
}: {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}) {
    const slideAnim = React.useRef(new Animated.Value(300)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            {/* Dark Overlay */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={onCancel}
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.4)",
                }}
            />

            {/* Bottom Sheet */}
            <Animated.View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    transform: [{ translateY: slideAnim }],
                    backgroundColor: "white",
                    padding: 20,
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28,
                }}
            >
                <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
                    Delete Habit?
                </Text>

                <Text style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>
                    This action cannot be undone.
                </Text>

                {/* Buttons */}
                <TouchableOpacity
                    onPress={onConfirm}
                    style={{
                        backgroundColor: "#ff3b30",
                        paddingVertical: 14,
                        borderRadius: 16,
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "600",
                            fontSize: 16,
                        }}
                    >
                        Delete Habit
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onCancel}
                    style={{
                        backgroundColor: "#f2f2f2",
                        paddingVertical: 14,
                        borderRadius: 16,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#333",
                            fontWeight: "600",
                            fontSize: 16,
                        }}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
}

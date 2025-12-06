import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function CategoryActionsModal({
    visible,
    onClose,
    onEdit,
    onDelete,
}: {
    visible: boolean;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                className="flex-1 bg-black/40 items-center justify-center"
            >
                <View className="w-64 bg-white dark:bg-gray-800 rounded-xl p-4">

                    {/* Edit */}
                    <TouchableOpacity
                        className="py-3"
                        onPress={() => {
                            onEdit();
                            onClose();
                        }}
                    >
                        <Text className="text-blue-600 dark:text-blue-400 text-center text-base">
                            Edit Category
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View className="h-[1px] bg-gray-300 dark:bg-gray-700 my-2" />

                    {/* Delete */}
                    <TouchableOpacity
                        className="py-3"
                        onPress={() => {
                            onDelete();
                            onClose();
                        }}
                    >
                        <Text className="text-red-600 dark:text-red-400 text-center text-base">
                            Delete Category
                        </Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </Modal>
    );
}

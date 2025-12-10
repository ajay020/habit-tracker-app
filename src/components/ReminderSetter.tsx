import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
    enabled: boolean;
    onToggle: (value: boolean) => void;

    time: string;
    onTimeChange: (value: string) => void;

    message: string;
    onMessageChange: (value: string) => void;
};

export default function ReminderSetter({
    enabled,
    onToggle,
    time,
    onTimeChange,
    message,
    onMessageChange,
}: Props) {
    const [showPicker, setShowPicker] = useState(false);

    const openPicker = () => setShowPicker(true);

    const handleTimeChange = (_: DateTimePickerEvent, selected: Date | undefined) => {
        setShowPicker(false);
        if (!selected) return;

        const hh = selected.getHours().toString().padStart(2, "0");
        const mm = selected.getMinutes().toString().padStart(2, "0");

        onTimeChange(`${hh}:${mm}`);
    };

    return (
        <View className="mb-6">
            {/* Header Row */}
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-700 dark:text-gray-300 font-medium">
                    Reminder
                </Text>
                <Switch value={enabled} onValueChange={onToggle} />
            </View>

            {/* Input Fields */}
            {enabled && (
                <View>
                    <TouchableOpacity
                        onPress={openPicker}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-3"
                    >
                        <Text className="text-gray-800 dark:text-gray-200">{time}</Text>
                    </TouchableOpacity>

                    <TextInput
                        value={message}
                        onChangeText={onMessageChange}
                        placeholder="Reminder message"
                        placeholderTextColor="#999"
                        className="border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white p-3 rounded-xl"
                    />
                </View>
            )}

            {showPicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    onChange={handleTimeChange}
                />
            )}
        </View>
    );
}

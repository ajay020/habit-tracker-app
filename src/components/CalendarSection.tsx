import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export function CalendarSection({ markedDates }: { markedDates: any }) {
    return (
        <View
            style={{
                backgroundColor: "white",
                padding: 16,
                borderRadius: 16,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
                Completion Calendar
            </Text>

            <Calendar
                markedDates={markedDates}
                markingType="period"
                theme={{
                    selectedDayBackgroundColor: "#FFC107",
                    todayTextColor: "#000",
                    arrowColor: "#FFC107",
                }}
            />
        </View>
    );
}

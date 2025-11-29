import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useThemeStore } from "../lib/themeStore";

export function CalendarSection({ markedDates }: { markedDates: any }) {
    const { theme } = useThemeStore()
    return (
        <View
            className="bg-card dark:bg-card-dark"
            style={{
                padding: 16,
                borderRadius: 16,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <Text
                style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}
                className="text-text dark:text-text-dark"
            >
                Completion Calendar
            </Text>

            <Calendar
                markedDates={markedDates}
                markingType="period"
                theme={{
                    calendarBackground: "transparent",
                    textSectionTitleColor: theme.text,
                    dayTextColor: theme.text,
                    monthTextColor: theme.text,
                    selectedDayBackgroundColor: "#FFC107",
                    todayTextColor: theme.primary,
                    arrowColor: "#FFC107",
                }}
            />
        </View>
    );
}

import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export const registerForPushNotifications = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Permission required', 'Enable notifications in settings');
        return;
    }
};

export async function scheduleHabitNotification(time: string, message: string) {
    const [hour, minute] = time.split(":").map(Number);

    const now = new Date();
    const firstTrigger = new Date();

    firstTrigger.setHours(hour, minute, 0, 0);

    // If time already passed today → schedule for tomorrow
    if (firstTrigger <= now) {
        firstTrigger.setDate(firstTrigger.getDate() + 1);
    }

    // 1️ FIRST FIRE (future date)
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Habit Reminder",
            body: message,
            sound: true,
        },
        trigger: {
            type: "date",
            date: firstTrigger,
        } as Notifications.DateTriggerInput,
    });

    // DAILY REPEATING FIRE
    const repeatingId = await Notifications.scheduleNotificationAsync({
        content: {
            title: "Habit Reminder",
            body: message,
            sound: true,
        },
        trigger: {
            type: "daily",
            hour,
            minute,
        } as Notifications.DailyTriggerInput,
    });

    return repeatingId;
}

export async function cancelScheduledNotification(notificationId?: string | null) {
    if (!notificationId) return;
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (e) {
        console.log("Failed to cancel notification", e);
    }
}

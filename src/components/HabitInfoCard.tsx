import { Text } from "react-native";
import Card from "./common/card";

export function HabitInfoCard({
    title,
    description,
    scheduleText,
}: {
    title: string;
    description?: string;
    scheduleText: string;
}) {
    return (
        <Card className="mb-4">
            <Text className="text-text text-2xl dark:text-text-dark font-bold mb-2">
                {title}
            </Text>

            {description ? (
                <Text
                    className="text-textSecondary dark:text-textSecondary-dark mb-2"
                >{description}</Text>
            ) : null}

            <Text className="text-textSecondary dark:text-textSecondary-dark">{scheduleText}</Text>
        </Card>
    );
}

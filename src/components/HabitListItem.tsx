import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Habit } from '../types/habit.types';

type HabitListItemProps = {
  habit: Habit;
  isDone: boolean;
  markHabitDone: (id: number) => void 
}

export const HabitListItem = ({ habit, isDone , markHabitDone }: HabitListItemProps) => {
    return (
        <View
            className="
                    flex-row items-center justify-between
                     p-4 mb-3 rounded-xl
                      border
                     bg-card dark:bg-card-dark
                    "
        >
            <Link
                href={`/(habits)/${habit.id}`}
                asChild
            >
                <TouchableOpacity
                    className="flex-1 mr-2 "
                    onPress={() => {
                        console.log("habit tapped: ", habit.id);
                    }}
                    activeOpacity={0.7}
                >
                    <Text className="text-lg text-text dark:text-text-dark font-medium">{habit.title}</Text>
                    {habit.description ? (
                        <Text className="text-textSecondary dark:text-text-dark text-sm">{habit.description}</Text>
                    ) : null}
                </TouchableOpacity>
            </Link>

            <Checkbox
                className="p-3"
                value={isDone}
                onValueChange={(v) => {
                    console.log("Checkbox tapped!");
                    markHabitDone(habit.id);
                }}
                color={isDone ? "#4CAF50" : "#aaa"}
            />
        </View>
    )
}

export default HabitListItem
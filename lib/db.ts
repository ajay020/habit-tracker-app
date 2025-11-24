import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("habits.db");

export function initializeDatabase() {

    // db.runSync("DROP TABLE IF EXISTS habits");

    db.execSync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            scheduleType TEXT NOT NULL DEFAULT 'daily',
            daysOfWeek TEXT,
            startDate TEXT DEFAULT (date('now')),
            createdAt TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS habit_completions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            habitId INTEGER NOT NULL,
            date TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 1,
            UNIQUE(habitId, date),
            FOREIGN KEY (habitId) REFERENCES habits(id) ON DELETE CASCADE
        );
    `);
}

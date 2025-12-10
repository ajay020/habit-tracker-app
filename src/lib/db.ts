import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("habits.db");

export function initializeDatabase() {

    // db.runSync("DROP TABLE IF EXISTS habits");
    // db.runSync("DROP TABLE IF EXISTS categories");

    db.execSync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL UNIQUE,
            icon TEXT DEFAULT 'folder',
            color TEXT DEFAULT '#3b82f6',
            createdAt TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS habits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            scheduleType TEXT NOT NULL DEFAULT 'daily',
            daysOfWeek TEXT,
            notificationId TEXT,
            icon TEXT DEFAULT 'check-circle',
            color TEXT DEFAULT '#3b82f6',
            categoryId INTEGER,
            reminderTime TEXT,
            reminderMessage TEXT,
            startDate TEXT DEFAULT (date('now')),
            createdAt TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS habit_completions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            habitId INTEGER NOT NULL,
            date TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 1,
            UNIQUE(habitId, date),
            FOREIGN KEY (habitId) REFERENCES habits(id) ON DELETE CASCADE
        );

         -- Insert default categories
        INSERT OR IGNORE INTO categories (title, icon, color) VALUES 
            ('Health', 'heart', '#ef4444'),
            ('Fitness', 'dumbbell', '#f97316'),
            ('Learning', 'book', '#3b82f6'),
            ('Productivity', 'briefcase', '#8b5cf6'),
            ('Mindfulness', 'brain', '#06b6d4'),
            ('Social', 'users', '#ec4899'),
            ('Finance', 'dollar-sign', '#10b981'),
            ('General', 'folder', '#6b7280');
    `);
}

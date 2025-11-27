import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("habits.db");

export const initDB = () => {
    db.transaction(tx => {
        tx.executeSql(`
      CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT
      );
    `);
    });
};

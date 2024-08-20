import * as SQLite from 'expo-sqlite';
import { TaskModel } from "./task";

export async function getDatabaseConnection() {
    return await SQLite.openDatabaseAsync("taskmaster.db");
}

export async function createDBStructure(db: SQLite.SQLiteDatabase) {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS tasks (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              title TEXT NOT NULL, 
                              priority INTEGER NOT NULL, 
                              time INTEGER NOT NULL);`;
    await db.runAsync(createTableQuery);
}

export async function insertTask(db: SQLite.SQLiteDatabase, task: TaskModel) {
    try {
        const insertTaskQuery = `INSERT INTO tasks (title, priority, time)
        VALUES (?, ?, ?);`;
        await db.runAsync(insertTaskQuery, [task.title, task.priority, task.time]);
    } catch (error) {
        console.error(error);
        throw Error("Failed to insert task");
    }

}

export async function getAllTasks(db: SQLite.SQLiteDatabase): Promise<TaskModel[]> {
    try {
        const getAllTasksQuery = `SELECT rowid as id, title, priority, time
        FROM tasks;`;
        const result = await db.getAllAsync<TaskModel>(getAllTasksQuery);
        const tasks: TaskModel[] = [];
        for (const row of result) {
            tasks.push(row);
        }
        return tasks;
    } catch (error) {
        console.error(error);
        throw Error("Failed to fetch all tasks");
    }

}

export async function getTasksCount(db: SQLite.SQLiteDatabase): Promise<number | null> {
    try {
        const getCountQuery = `SELECT COUNT(1) as count FROM tasks;`;
        const result = await db.getFirstAsync<number>(getCountQuery);
        const count = result;
        return count;
    } catch (error) {
        console.error(error);
        throw Error("Failed to count tasks");
    }

}

// FOR TESTING
export async function insertForTesting(db: SQLite.SQLiteDatabase) {
    const count = await getTasksCount(db);
    if (count === 0) {
        await insertTask(db, { id: 0, title: "Mow the lawn", priority: 5, time: 60 });
        await insertTask(db, { id: 0, title: "Chest workout", priority: 10, time: 90 });
        await insertTask(db, { id: 0, title: "Clean the dishes", priority: 3, time: 15 });
        await insertTask(db, { id: 0, title: "Read 2 chapters of the book", priority: 3, time: 30 });
    }
}

// FOR TESTING
export async function deleteData(db: SQLite.SQLiteDatabase) {
    const deleteQuery = `DELETE FROM tasks;`;
    await db.runAsync(deleteQuery);
}
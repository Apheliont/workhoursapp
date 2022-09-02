import Database from 'tauri-plugin-sql-api';
import { resourceDir } from '@tauri-apps/api/path';
import type { NewUser, User } from '../models/User';

const appPath = await resourceDir();
const trimmedPath = appPath.replace("\\\\?\\", "");

let db = null
const load = Database.load(`sqlite:${trimmedPath}workhours.db`).then(instance => {
    db = instance
    return db
})

async function getAllUsers(): Promise<User[]> {
    return await db.select('SELECT * FROM users');
}

async function init(): Promise<void> {
    await load;
    await db.execute(`
        CREATE TABLE
         IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            patronymic VARCHAR(255),
            notes TEXT,
            created_at TEXT,
            updated_at TEXT)`);
}

async function createUser(new_user: NewUser): Promise<User> {
    const { first_name, last_name, patronymic, notes } = new_user;
    const created_at = new Date().toLocaleString().slice(0, 17);
    const { lastInsertId: id } = await db.execute(`
        INSERT INTO users (
            first_name,
            last_name,
            patronymic,
            notes,
            created_at,
            updated_at) VALUES ($1, $2, $3, $4, $5, $6)`,
        [first_name, last_name, patronymic, notes, created_at, created_at]);
    return {
        id,
        first_name,
        last_name,
        patronymic,
        notes,
        created_at,
        updated_at: created_at
    };
}

async function updateUser(user: User): Promise<User> {
    const { id, first_name, last_name, patronymic, notes } = user;
    const { updated_at, created_at } = await db.execute(`
        UPDATE users
            SET first_name = $1,
            last_name = $2,
            patronymic = $3,
            notes = $4,
            updated_at = $5
            WHERE id = $6`,
        [first_name, last_name, patronymic, notes, new Date().toLocaleString().slice(0, 17), id]);
    return {
        id,
        first_name,
        last_name,
        patronymic,
        notes,
        created_at,
        updated_at
    };
}

async function removeUser(id: number): Promise<boolean> {
    return await db.execute('DELETE FROM users WHERE id = $1', [id]);
}

export default {
    getAllUsers,
    createUser,
    updateUser,
    removeUser,
    init
};
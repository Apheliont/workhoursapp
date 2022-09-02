import { writable } from 'svelte/store';
import Db from '../services/Db';
import type { User } from '../models/User';

export const users = writable<User[]>([]);

export async function getAll(): Promise<void> {
    const $users: User[] = await Db.getAllUsers();
    users.set($users);
}


export async function remove(id: number): Promise<void> {
    await Db.removeUser(id);
    users.update(($users) => {
        const idx = $users.findIndex((user) => user.id === id);
        $users.splice(idx, 1);
        return $users;
    });
}

export async function add(NewUser): Promise<void> {
    const newUser: User = await Db.createUser(NewUser);
    users.update(($users) => {
        return [...$users, newUser];
    });
}

export async function update(User): Promise<void> {
    await Db.updateUser(User);
    users.update(($users) => {
        const idx = $users.findIndex((user) => user.id === User.id);
        $users.splice(idx, 1, User);
        return $users;
    });
}


export function findOne(id: number): User | null {
    let foundUser: User | null;
    users.subscribe(($users) => {
        const idx = $users.findIndex(u => u.id == id);
        if (idx !== -1) {
            foundUser = $users[idx];
        } else {
            foundUser = null;
        }
    });
    return foundUser;
}
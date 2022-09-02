export interface User {
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    notes: string;
    created_at: string;
    updated_at: string;
}


export interface NewUser {
    first_name: string;
    last_name: string;
    patronymic: string;
    notes: string;
}

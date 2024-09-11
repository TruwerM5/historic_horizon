export interface User {
    id: number;
    email: string;
    username: string;
    role: Roles,
    status: "ACTIVE" | "BLOCKED";
    _count?: {
        articles: number;
    }
}

export enum Roles {
    Admin = "ADMIN",
    Author = "AUTHOR",
    User = "User"
}
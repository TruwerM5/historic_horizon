import axios from "axios";
import { apiBase } from "~/constants";
import type { User } from "~/types/user";


export const listUsers = async () => {
    try {
        const users = await axios.get<Omit<User,"password" | "likes" | "articles">[]>(`${apiBase}/users`,{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return users.data;
    }catch(e: any) {
        
    }
};
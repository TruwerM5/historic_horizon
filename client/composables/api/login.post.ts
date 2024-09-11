import { apiBase } from "~/constants";
import axios from "axios";
import type { User } from "~/types/user";


export const login = async (email: string, password: string) => {
    const req = await axios.post<{user: User;}>(`${apiBase}/auth/login`, 
        {
        email: email,
        password: password
    }, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    });
    return req.data;
}
import { apiBase } from "~/constants";
import axios, { AxiosError } from "axios";
import type { User } from "~/types/user";


export const signUp = async (email: string, username: string, password: string, password_2: string) => {
    validateSignUpCredentials(email, username, password, password_2);
    const req = await axios.post<{user: User}>(`${apiBase}/auth/signup`, {
        email,
        username,
        password
    }, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
    });
    return req.data;
}


function validateSignUpCredentials(
        email: string, 
        username: string, 
        password: string, 
        password_2: string
    ) {
        if(password != password_2) {
            throw new AxiosError().status = 400;
        }
        return true;
}
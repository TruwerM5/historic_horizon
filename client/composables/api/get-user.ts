import axios from "axios";
import { apiBase } from "~/constants";
import type { User } from "~/types/user";



export const getUser = async () => {
    try {
        const request = await axios.get<{user: User}>(`${apiBase}/auth/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        return request.data;
    } catch(e: any) {       
        return null;
    }
    
}
import axios from "axios";
import { apiBase } from "~/constants";
import type { User } from "~/types/user";

export const setUserStatus = async (status: "BLOCKED" | "ACTIVE", user_id: number) => {

    try {
        const req = await axios.post<{user: User}>(`${apiBase}/users/${user_id}/set-status`, {
            status   
           }, {
               headers: {
                   "Content-Type": "application/json"
               },
               withCredentials: true
           });
        return req.data;
    } catch(e) {
        console.log("Error");
        return null;
    }
};
import axios from "axios";
import { apiBase } from "~/constants";
import type { User } from "~/types/user";

export const editProfile = async (newEmail?: string, newUsername?: string) => {
    try {
        const req = await axios.post<{user: User}>(`${apiBase}/users/edit`, {
            email: newEmail,
            username: newUsername,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return req.data;
    } catch(e: any) {
        console.log("ERROR: ", e.message);
    }
};
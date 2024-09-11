import { apiBase } from "~/constants";
import axios from "axios";

export const logout = async () => {
    const request = await axios.post(`${apiBase}/auth/logout`, {},{
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    });
    return request.data;
}
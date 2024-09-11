import axios from "axios";
import { apiBase } from "~/constants";
import type { User } from "~/types/user";


export const editPassword = async (oldpassword: string, password: string): Promise<any> => {

    try {
        const req = await axios.post<{user: User;}>(`${apiBase}/users/edit-password`, {
            oldpassword,
            password
        },{
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return {user: req.data};
    } catch(e: any){
        console.log(e);
        if(e.response.status == 400) {
            return { error: "Неверный старый пароль" }
        }
        if(e.response.status == 401) {
            return { error: "Unauthorized" };
        }
        return {error: ""};
    }

};
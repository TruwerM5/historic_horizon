import axios from "axios";
import { apiBase } from "~/constants";
import type Article from "~/types/article";
import type { User } from "~/types/user";


export const getAuthorArticles = async (author_name: string | string[]) => {
    try {
        const req = await axios.get<Article[]>(`${apiBase}/articles/author/${author_name}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
    
        return req.data;
    } catch(e: any) {
        console.log("Error: ", e);
    }
    

}
import type { User } from "~/types/user"
import { getUser } from "~/composables/api/get-user";
import type Article from "~/types/article";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: <User>({}),
            isAuthenticated: false,
            own_articles: <Article[]>([]),
        }
    },
    getters: { 
        isAdmin: (state) => {
            return state.user.role === "ADMIN" && state.isAuthenticated;
        },
        isAuthor: (state) => {
            return state.user.role === "AUTHOR" && state.isAuthenticated;
        }
    },
    actions: {
        setUser(user: User) {
            this.user = user;
            this.isAuthenticated = true;
            
        },
        logoutUser() {
            this.user = <User>({});
            this.isAuthenticated = false;
            location.reload();
        },
        async checkIsAuthenticated() {
            const user = await getUser();
            if(user) {
                this.setUser(user.user);
            } else {
                this.user = <User>({});
                this.isAuthenticated = false;
            }
        },
        addOwnArticle(articles: Article[]) {
            this.own_articles.push(...articles);
            
        }
    }
})
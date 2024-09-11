
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
export default defineNuxtRouteMiddleware(async (to, from) => {
    
    if(!userStore.isAuthenticated) {
        toggleSignInOverlay();
        return navigateTo('/');
        
    };

});
<script lang="ts" setup>
import { getAuthorArticles } from '~/composables/api/author-articles';
import type Article from '~/types/article';
import ArticleListVue from '~/components/articles/ArticleListVue.vue';


// definePageMeta({
//     middleware: 'auth'
// })

const signInOverlay = useSignInOverlay();
const userStore = useUserStore();
const my_articles = ref<Article[] | undefined>([]);
const router = useRouter();
function checkAuth() {
    if(!userStore.isAuthenticated && !userStore.isAuthor) {
        navigateTo('/');
        toggleSignInOverlay();
        return;
    } 
}


onNuxtReady(async () => {
    //if user reloads page
    
    watchEffect(async () => {
        await userStore.checkIsAuthenticated();
        checkAuth();
    });
    my_articles.value = await getAuthorArticles(userStore.user.username);
    if(my_articles.value) {
        userStore.addOwnArticle(my_articles.value);
    }
});


</script>

<template>
    <div class="my-articles page">
        <h1 class="page-title">Мои статьи ({{ my_articles?.length }})</h1>
        <ArticleListVue v-if="my_articles" :articles="my_articles" />
    </div>
</template>
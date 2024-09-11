<script lang="ts" setup>
import type Article from '~/types/article';
import ArticleListVue from '~/components/articles/ArticleListVue.vue';
import { getAuthorArticles } from '~/composables/api/author-articles';

const route = useRoute();
const router = useRouter();
const author_articles = ref<Article[] | undefined>([]);
const pending = ref(true);



author_articles.value = await getAuthorArticles(route.params.author_name);
    


onNuxtReady(() => {
    pending.value = false;
    if(!author_articles.value?.length) {
        navigateTo('/');
    }
})

</script>

<template>
    <div class="author-articles page">
        <h1 class="page-title">Автор: {{ route.params.author_name }}</h1>
        <ArticleListVue v-if="author_articles" :articles="author_articles" />
        <LoadingVue v-if="pending" />
    </div>
    

</template>
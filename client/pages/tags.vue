<script lang="ts" setup>
import type Article from "~/types/article";
import ArticleListVue from "~/components/articles/ArticleListVue.vue";

const route = useRoute();

const articles = ref<Article[] | undefined>(
  await searchArticlesByQuery(route.query.tag),
);

onBeforeRouteUpdate(async (to, from) => {
  articles.value = await searchArticlesByQuery(to.query.tag);
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="tags-page tags">
    <template v-if="articles">
      <h1 class="tags__title">
        {{ route.query.tag }}
      </h1>
      <ArticleListVue :articles="articles" />
    </template>
  </div>
</template>

<style lang="sass">
.tags
    padding-inline: 10px
    &__title
        font-family: Oswald
        font-size: 30px
        text-align: center
        margin-bottom: 20px
</style>

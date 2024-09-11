<script lang="ts" setup>
import type Article from "~/types/article";
import ArticleItemVue from "./articles/ArticleItemVue.vue";
const theme = useCurrentTheme();

const take = 4;
let from = 1;

const articles = ref<Article[] | undefined>([]);

async function getArticles() {
  return await getLatestArticles(from);
}

onNuxtReady(async () => {
  articles.value = await getArticles();
  //    if(articles.value) {
  //         from += take;
  //         to += take;
  //     }
});
</script>

<template>
  <div
    :class="[
      'recent-articles recent theme-transition',
      { 'recent_theme-dark': theme == 'dark' },
    ]"
    v-if="articles"
  >
    <h3 class="recent__title subtitle">Недавние статьи</h3>
    <div class="recent__list">
      <ArticleItemVue
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
    <NuxtLink to="/latest" class="recent__link"> Больше статей </NuxtLink>
  </div>
</template>

<style lang="sass">
.recent
    margin-inline: 20px
    margin-block: 40px
    border-top: 1px solid #333

    &_theme-dark
        border-top-color: #fff
    &__list
        display: grid
        grid-template-columns: 1fr
        row-gap: 25px
        @media screen and (min-width: 768px)
            grid-template-columns: 1fr 1fr
            column-gap: 25px
    &__link
        margin-top: 25px
        font-family: Roboto
        text-align: center
        transition: opacity .4s
        &:hover
            opacity: 0.6
            text-decoration: underline
        @media screen and (min-width: 768px)
            font-size: 20px
</style>

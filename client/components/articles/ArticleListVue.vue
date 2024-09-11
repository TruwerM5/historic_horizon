<script lang="ts" setup>
import type Article from "~/types/article";
import ArticleItemVue from "~/components/articles/ArticleItemVue.vue";
const props = defineProps<{ articles: Article[] }>();
</script>

<template>
  <ul class="article-list" v-if="articles">
    <ArticleItemVue
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </ul>
</template>

<style lang="sass">
.article-list
    display: grid
    row-gap: 20px
    @media screen and (min-width: 600px) and (max-width: 767px)
      margin-inline: 60px
    @media screen and (min-width: 768px)
        grid-template-columns:  1fr 1fr
        gap: 60px
        justify-content: center
        // align-items: stretch

// .article-item
//     display: grid

//     &__title
//         font-family: 'Roboto'
//         font-size: 18px
//     &__figure
//         min-height: 100px
//         display: grid
//         grid-template-columns: 3fr 5fr
//         column-gap: 10px
//     &__caption
//         flex: 1
//     &__image
//         height: 100%
//         object-fit: cover
//         @media screen and (min-width: 768px)
//             width: 80%
</style>

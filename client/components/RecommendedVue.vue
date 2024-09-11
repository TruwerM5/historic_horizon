<script lang="ts" setup>
import type Article from "~/types/article";
import ArticleListVue from "./articles/ArticleListVue.vue";

const props = defineProps<{ articles: Article[] }>();
</script>

<template>
  <div class="recommended">
    <h4 class="recommended__title">Смотрите также</h4>
    <ArticleListVue :articles="articles" />
  </div>
</template>

<style lang="sass">
.recommended
    &__title
        font-size: 26px
        font-family: Roboto
</style>

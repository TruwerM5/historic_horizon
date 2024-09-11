<script lang="ts" setup>
import type Article from "~/types/article";
import ArticleListVue from "~/components/articles/ArticleListVue.vue";

const theme = useCurrentTheme();

const take = 5;
let from = 0;
let to = 5;
const pending = ref(false);

const articles = ref<Article[] | undefined>([]);
const newArticles = ref<Article[] | undefined>([]);

onNuxtReady(async () => {
  articles.value = await getLatestArticles(from);
  window.addEventListener("scroll", onScrollToEnd);
});

async function onScrollToEnd() {
  const windowScrollY = window.scrollY;
  const documentClientHeight = document.documentElement.clientHeight;
  const documentScrollHeight = document.documentElement.scrollHeight;
  if (windowScrollY + documentClientHeight == documentScrollHeight) {
    pending.value = true;
    from += take + 1;
    to = take + from;
    newArticles.value = await getLatestArticles(from);
    if (articles.value && newArticles.value && newArticles.value.length > 0) {
      articles.value.push(...newArticles.value);
    } else {
      window.removeEventListener("scroll", onScrollToEnd);
    }
    pending.value = false;
  }
}
</script>

<template>
  <div class="latest-articles-page latest">
    <h3 class="latest__title subtitle">Архив</h3>
    <div v-if="articles" class="latest__inner">
      <ArticleListVue :articles="articles" />
    </div>
    <LoadingVue v-if="pending" />
  </div>
</template>

<style lang="sass">
.latest
    margin-inline: 20px
</style>

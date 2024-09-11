<script lang="ts" setup>
import type Article from "~/types/article";
import ArticleListVue from "~/components/articles/ArticleListVue.vue";
// import type LocationQueryValue
const router = useRouter();
const route = useRoute();
const searchHistory = useSearchStore();
const articles = ref<Article[] | undefined>([]);
const searchString = ref<any>(route.query.text || "");
if (route.query) {
  articles.value = await getArticles(route.query);
}

async function getArticles(query: any) {
  return await searchArticlesByTitleOrTag(query);
}

onBeforeRouteUpdate(async (to: any, from: any) => {
  searchString.value = to.query.text;
  articles.value = await getArticles(to.query);
});

function search() {
  if (searchString.value) {
    searchHistory.addToHistory(searchString.value);
  }

  router.push({ path: "/search", query: { text: searchString.value } });
}
</script>

<template>
  <div class="search-page search">
    <div v-if="articles" class="search__inner">
      <h3 class="search__title">Результаты поиска</h3>
      <form @submit.prevent class="search__form">
        <div class="relative">
          <input
            v-model="searchString"
            type="text"
            class="input search__input"
            @keydown.enter="search"
            @focus="searchHistory.open(searchString)"
            @focusout="searchHistory.close"
          />
          <!-- <SearchHistory :class="{'opened': searchHistory.isOpened}" /> -->
        </div>
        <button @click="search" type="submit" class="search-submit-button">
          Найти
        </button>
      </form>
      <ArticleListVue :articles="articles" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.search
    margin-inline: 20px
    @media screen and (min-width: 768px)
        margin-inline: 0
    &__title
        font-size: 19px
        font-family: Roboto
        margin-bottom: 15px
    &__form
        display: flex
        flex-direction: column
        align-items: flex-start
        width: fit-content
        gap: 20px
        margin-bottom: 40px
    &__input
        max-width: 300px
        margin: 0
        font-size: 18px
.search-submit-button
    margin: 0
</style>

<script lang="ts" setup>
import { useArticlesStore } from "#imports";
import { useUserStore } from "#imports";
import type Article from "~/types/article";
import RecommendedVue from "~/components/RecommendedVue.vue";
import { marked } from "marked";
import DeleteArticleButtonVue from "~/components/articles/DeleteArticleButtonVue.vue";
import EditArticleButtonVue from "~/components/articles/EditArticleButtonVue.vue";
import SubmitDeleteVue from "~/components/articles/SubmitDeleteVue.vue";
import EditArticleVue from "~/components/articles/EditArticleVue.vue";
const theme = useCurrentTheme();
const isMounted = ref(false);
const loading = ref(true);
const route = useRoute();
const articlesStore = useArticlesStore();
const userStore = useUserStore();
const content = ref("");
const article = ref<Article | null>(
  articlesStore.getArticleFromCache(Number(route.params.id)),
);
const tags = ref<any>();
const imageLoading = ref(true);
const recommendedArticles = ref<Article[] | undefined>();
const isMyArticle = ref(false);
const isModalOpened = ref(false);
const isEditFormOpened = ref(false);

if (!article.value) {
  const fetchedArticle = await fetchArticleById(route.params.id);
  if (fetchedArticle) {
    article.value = fetchedArticle as Article;
  }
} else {
  article.value = articlesStore.getArticleFromCache(Number(route.params.id));
}



if (article.value) {
  content.value = await marked(article.value.articleContent.content);
  tags.value = article.value.tags;
  articlesStore.addArticleToCache(article.value);
}

onNuxtReady(async () => {
  // setTimeout(() => {
    loading.value = false;
    isMounted.value = true;
  // }, 500);

  recommendedArticles.value = await getRecommendedArticles();
  if((userStore.isAuthor || userStore.isAdmin) && article.value) {
    isMyArticle.value = await isArticleBelongsToAuthor(userStore.user.id, article.value.id);
  }
});

function onImageLoad() {
  imageLoading.value = false;
}

async function getRecommendedArticles() {
  let result: Article[] = [];

  if (article.value && article.value.tags) {
    const tags = article.value.tags;

    for (let i = 0; i < tags.length; i++) {
      const request = await getRecommended(tags[i]);
      if (request) {
        result.push(...request);
        result = result.filter((item) => {
          if (article.value) {
            return item.id != article.value.id;
          }
        });
        if (result.length >= 3) {
          break;
        }
      }
    }
  }

  const uniqueValues = new Set<any>();

  return result.filter((item) => {
    const isDuplicate = uniqueValues.has(item['title']);
    uniqueValues.add(item['title']);
    return !isDuplicate;
  })
  
}



watchEffect(async () => {
  if((userStore.isAuthor || userStore.isAdmin) && article.value) {
    isMyArticle.value = await isArticleBelongsToAuthor(userStore.user.id, article.value.id);
  }
  
})


</script>

<template>
  <div
    :class="['article-page article', { 'article_theme-dark': theme == 'dark' }]"
  >
    <LoadingVue v-if="loading" />
    <template v-else-if="isMounted && article">
      <div class="article__inner">
        <h1 class="article__title">{{ article.title }}</h1>
        <div class="article__banner w-full">
          <LocalLoadingVue v-if="imageLoading" />
          <img
            loading="lazy"
            @load="onImageLoad"
            @loadeddata="onImageLoad"
            :src="'http://localhost:3001/images/' + article.banner"
            :alt="article.title"
            :class="['article__image', { loaded: !imageLoading }]"
          />
        </div>
        <div
          v-html="content"
          class="article__content"
        ></div>
        <div class="article__tags">
          <NuxtLink
            v-for="(tag, i) in tags"
            :key="i"
            :to="{ path: '/tags', query: { tag } }"
            class="article__tag-link"
          >
            {{ tag }}
          </NuxtLink>
        </div>
        <span class="article__pub-date">
          {{ prettyDate(article.pub_date) }}
        </span>
        <div v-if="isMyArticle" 
          :class="['article__actions', {'theme-dark': theme == 'dark'}]">
          <EditArticleButtonVue
            class="article__action-button"
            @click="isEditFormOpened = true"
          />
          <DeleteArticleButtonVue
            class="article__action-button" 
            :article_id="article.id"
            @click="isModalOpened = true" 
          />
        </div>
      </div>
      <div
        class="recommended-wrapper"
        v-if="recommendedArticles && recommendedArticles.length > 0"
      >
        <RecommendedVue :articles="recommendedArticles" />
      </div>
      <Transition name="fade">
        <SubmitDeleteVue 
          :article_id="article.id" 
          v-if="isModalOpened && isMyArticle" 
          @close-modal="isModalOpened = false" 
        />
      </Transition>
      <Transition name="fade">
        <EditArticleVue 
          v-if="isEditFormOpened && isMyArticle" 
          :article="article"
          @close-edit="isEditFormOpened = false"
        />
      </Transition>
    </template>
    <template v-else-if="!article">
      <h1 class="not-found-title">Статья не найдена</h1>
      <RecentVue />
    </template>
    
  </div>
</template>

<style lang="sass">
.article
    padding: 0 15px 30px 15px
    color: #000
    &_theme-dark
        color: #fff
        .article__tag-link
            color: #111
            background-color: #999
    &__inner
        max-width: 700px
        margin: 0 auto
    &__title
        margin-bottom: 15px
        font-family: Oswald
        font-size: 35px

        @media screen and (min-width: 768px)
            font-size: 40px
    &__banner
        margin-bottom: 15px
    &__image
        opacity: 0
        margin: 0 auto
        &.loaded
            opacity: 1
    &__content
        margin-bottom: 15px
        h4
            font-size: 22px
            font-weight: 500
            margin-bottom: 5px
            font-weight: 600
            @media screen and (min-width: 768px)
                font-size: 28px
        p,li
            margin-bottom: 15px
            font-size: 18px
            @media screen and (min-width: 768px)
                font-size: 24px
                line-height: 1.8
        li
            display: list-item
        ol
            list-style: decimal
            list-style-position: inside

    &__pub-date
        font-family: Roboto
        font-style: italic
        margin-top: 15px
    &__tags
        display: flex
        gap: 10px
        flex-wrap: wrap
    &__tag-link
        font-family: Roboto
        padding: 5px 10px
        background-color: #000
        color: #fff
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
        transition: opacity .2s
        &:hover
          opacity: 0.6
          text-decoration: underline
    &__actions
      position: sticky
      bottom: 0
      display: flex
      justify-content: center
      gap: 30px
      padding: 12px 0
      background-color: #f3f3f3
      &.theme-dark
        background-color: #2c2c2c
    // &__action-button
    //   flex: 1
.recommended-wrapper
    margin-top: 40px

.not-found-title
    font-family: Roboto
    font-size: 40px

.submit-delete-form
  padding: 20px
  display: flex
  flex-direction: column
  gap: 20px
  background-color: #fff
  font-family: Roboto
  color: #000
</style>

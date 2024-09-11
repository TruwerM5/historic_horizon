<script lang="ts" setup>
import { useArticlesStore } from "#imports";

const articlesStore = useArticlesStore();
const theme = useCurrentTheme();
const { data, error } = await useFetch<{
  id: number;
  title: string;
  banner: string;
  tags: string;
}>("http://localhost:3001/api/articles/last");
</script>

<template>
  <div :class="['hero', { 'hero_theme-dark': theme == 'dark' }]">
    <div v-if="data" class="hero__wrapper">
      <NuxtLink :to="{ path: `/articles/${data.id}` }" class="hero__block">
        <img
          :src="`http://localhost:3001/images/${data.banner}`"
          :alt="data.banner"
          class="hero__banner"
        />
        <h2 class="hero__title text-transition">{{ data.title }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="sass">
.hero
    color: #fff
    &__block
        position: relative
    &__title
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        padding: 10px
        font-family: 'Oswald'
        font-size: 26px
        background-color: rgba(0, 0, 0, 0.75)
        @media screen and (min-width: 768px)
            font-size: 30px
            &:hover
                text-decoration: underline
        @media screen and (min-width: 1024px)
            font-size: 40px
    &__banner
        width: 100%
        max-height: 500px
        object-fit: cover
        object-position: center center
</style>

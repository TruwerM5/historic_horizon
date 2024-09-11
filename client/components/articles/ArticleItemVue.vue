<script lang="ts" setup>
import type Article from "~/types/article";

const theme = useCurrentTheme();

const props = defineProps<{ article: Article }>();
</script>

<template>
  <div v-if="article" class="article-item item">
    <NuxtLink
      :to="{ path: `/articles/${article.id}` }"
      class="item__image-link"
    >
      <img
        :src="`http://localhost:3001/images/${article.banner}`"
        :alt="article.title"
        class="item__image"
      />
    </NuxtLink>
    <div class="item__content">
      <h4 class="item__title">
        <NuxtLink
          :to="{ path: `/articles/${article.id}` }"
          class="item__link text-transition"
        >
          {{ article.title }}
        </NuxtLink>
      </h4>
    </div>
    <div v-if="article.tags" class="item__tags">
      <NuxtLink
        v-for="(tag, i) in article.tags"
        :key="i"
        :to="{ path: `/tags`, query: { tag } }"
        :class="['item__tag-link accent-color', { dark: theme == 'dark' }]"
        >{{ tag }}</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="sass">
.item
    display: grid
    grid-template-columns: 1fr
    @media screen and (min-width: 768px)
        grid-template-rows: 235px 1fr auto
        gap: 10px
    &__title
        font-family: 'Oswald'
        font-size: 22px
        letter-spacing: .3px
        line-height: 1.2
        margin-block: 10px 8px
        @media screen and (min-width: 600px)
          font-size: 26px
        @media screen and (min-width: 768px)
            margin-block: 0 8px
            font-size: 22px
        @media screen and (min-width: 1280px)
          font-size: 26px
    &__link
        line-height: inherit
        &:hover
            opacity: 0.6
            text-decoration: underline
    &__tags
        display: flex
        flex-wrap: wrap
        column-gap: 10px
        font-family: Roboto
        font-size: 14px
        font-weight: 500
        padding-bottom: 3px
    &__image-link
        position: relative
        overflow: hidden
    &__image
        height: 100%
        object-fit: cover
        object-position: center center
        transition: transform .35s
        @media screen and (min-width: 768px)
            height: 235px
            width: 100%
        &:hover
          transform: scale(1.3)
    &__tag-link
        transition: opacity .2s, border-color .2s
        border-bottom: 1px solid #d62400
        &.dark
            border-color: #ff8f78
        &:hover
            opacity: 0.6
        @media screen and (min-width: 1280px)
          font-size: 16px
</style>

<script lang="ts" setup>
const isSearchOpened = useSearch();
const theme = useCurrentTheme();
const router = useRouter();
const searchString = ref("");
const errorMessage = ref("");
function onSubmit() {
  if (searchString.value) {
    toggleSearch();
    router.push({ path: "/search", query: { text: searchString.value } });
    searchString.value = "";
    errorMessage.value = "";
    return;
  }
  errorMessage.value = "Введите запрос";
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isSearchOpened"
      :class="[
        'search-block overlay',
        { 'overlay_theme-dark': theme == 'dark' },
      ]"
      @keydown.enter="onSubmit"
    >
      <OverlayCloseButtonVue @click="toggleSearch" />
      <div class="search-block__content">
        <h4 class="search-block__title">Поиск</h4>
        <span class="search-block__label">Название темы</span>
        <input
          type="text"
          name="search"
          id="search"
          v-model="searchString"
          class="search-block__input"
        />
        <span
          v-if="errorMessage"
          :class="[
            'search-block__error accent-color',
            { dark: theme == 'dark' },
          ]"
        >
          {{ errorMessage }}
        </span>
        <button class="primary-button" @click="onSubmit">Найти</button>
      </div>
    </div>
  </Transition>
</template>

<style lang="sass">
.search-block
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: grid
    align-content: center
    padding-inline: 30px
    z-index: 2
    font-family: Roboto
    &_theme-dark
        .search-block__line
            background-color: #fff
        .search-block__input
            background-color: #ccc
            color: #000
            border-bottom: 2px solid #000
    &__content
        grid-column: 1
    &__title
        margin-bottom: 45px
        font-family: Oswald
        font-size: 24px
        text-align: center
        @media screen and (min-width: 768px)
            font-size: 35px
    &__label
        max-width: 400px
        margin: 0 auto
        @media screen and (min-width: 768px)
            font-size: 20px
    &__input
        width: 100%
        max-width: 400px
        margin: 0 auto
        padding: 5px
        margin-bottom: 30px
        border-bottom: 2px solid #666
        // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
        background-color: transparent
        &:focus
            outline: none
        @media screen and (min-width: 768px)
            font-size: 24px
    &__error
        font-size: 20px
        text-align: center
        margin-bottom: 15px

.fade-leave-active,
.fade-enter-active
    transition: all .3s

.fade-enter-from,
.fade-leave-to
    transform: translateY(30px)
    opacity: 0
</style>

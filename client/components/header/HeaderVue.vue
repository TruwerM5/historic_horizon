<script lang="ts" setup>
import NavbarVue from "./NavbarVue.vue";
import ToggleThemeButtonVue from "./ToggleThemeButtonVue.vue";
import NavbarButtonVue from "./NavbarButtonVue.vue";
import SearchButtonVue from "./SearchButtonVue.vue";
import SignInButtonVue from "./SignInButtonVue.vue";
const theme = useCurrentTheme();
const isHidden = ref(false);
const scrollStart = ref<number>(0);
const currentScrollPosition = ref<number>();

onNuxtReady(() => {
  window.addEventListener("scroll", onScroll);
  window.addEventListener("scrollend", onScrollEnd);
  scrollStart.value = window.scrollY;
});

function onScroll(e: any) {
  currentScrollPosition.value = window.scrollY;
  if (currentScrollPosition.value - scrollStart.value > 75) {
    isHidden.value = true;
  } else if (
    currentScrollPosition.value - scrollStart.value < -100 ||
    window.scrollY < 100
  ) {
    isHidden.value = false;
  }
}

function onScrollEnd(e: any) {
  scrollStart.value = window.scrollY;
}
</script>

<template>
  <header
    :class="[
      'header theme-transition',
      { header__theme_dark: theme == 'dark', header_hidden: isHidden },
    ]"
  >
    <div class="header__inner">
      <NuxtLink
        to="/"
        :class="[
          'logo theme-transition fs-transition',
          {
            logo__theme_dark: theme == 'dark',
            logo__theme_light: theme == 'light',
          },
        ]"
      >
        Historic Horizon
      </NuxtLink>
      <div class="header__aside">
        <ToggleThemeButtonVue class="header__button" />
        <SearchButtonVue class="header__button" />
        <SignInButtonVue />
        <NavbarButtonVue />
      </div>
    </div>
    <NavbarVue />
  </header>
</template>

<style lang="sass">
.header
    position: fixed
    width: 100%
    top: 0
    left: 0
    padding: 10px 15px
    border-bottom: 2px solid
    transition: transform .2s
    background-color: #fff
    z-index: 1
    @media screen and (min-width: 768px)
        padding: 15px 30px
    &__inner
        @media screen and (min-width: 768px)
            max-width: 80%
            margin: 0 auto
    &_hidden
        transform: translateY(-100%)
    &__theme_dark
        background-color: #181818
        border-bottom-color: #ccc
    &__theme_light
        background-color: #fff
        border-bottom-color: #000
    &__inner
        display: grid
        grid-template-columns: 1fr 1fr
        align-items: center
    &__aside
        display: flex
        gap: 20px
        justify-content: flex-end
        align-items: center
        @media screen and (min-width: 768px)
            gap: 50px
    &__button
        @media screen and (min-width: 768px)
            width: 25px
            height: 25px
.logo
    font-family: Cinzel
    font-size: 22px
    max-width: 150px
    line-height: 1
    &__theme_dark
        color: #E0E0E0
    &__theme_light
        color: #000
    @media screen and (min-width: 768px)
        max-width: fit-content
        font-size: 32px
</style>

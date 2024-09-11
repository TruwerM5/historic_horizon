<script lang="ts" setup>
const theme = useCurrentTheme();
</script>

<template>
  <footer
    :class="[
      'footer theme-transition text-transition',
      { 'footer_theme-dark': theme == 'dark' },
    ]"
  >
    <div class="footer__inner">
      <nav class="footer__nav">
        <NuxtLink to="/" class="footer__link"> Главная </NuxtLink>
        <NuxtLink to="/about" class="footer__link"> О проекте </NuxtLink>
        <!-- <NuxtLink to="/support" class="footer__link">
          Поддержать проект
        </NuxtLink> -->
        <NuxtLink to="/latest" class="footer__link"> Архив </NuxtLink>
        <!-- <NuxtLink to="/topics" class="footer__link"> Темы </NuxtLink> -->
      </nav>
      <div
        :class="[
          'footer__bottom',
          { 'footer__bottom_theme-dark': theme == 'dark' },
        ]"
      >
        <p class="footer__text">
          &copy; {{ new Date().getFullYear() }} HISTORIC HORIZON
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="sass">
.footer
    background-color: #fff
    border-top: 1px solid #ccc
    font-family: Roboto
    font-size: 11px
    color: #000
    @media screen and (min-width: 768px)
        font-size: 18px
    &_theme-dark
        background-color: #181818
        border-top-color: #aaa
        color: #E0E0E0
    &__nav
        width: fit-content
        padding: 10px 15px
        margin: 0 auto
        display: grid
        grid-template-columns: auto auto auto
        gap: 10px 30px
    &__link
        transition: opacity .2s
        &:hover
            opacity: .8
            text-decoration: underline
    &__bottom
        padding: 10px 15px
        border-top: 1px solid #aaa
        &_theme-dark
            border-top-color: #ccc
    &__text
        text-align: center
</style>

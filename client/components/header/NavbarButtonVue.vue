<script lang="ts" setup>
const theme = useCurrentTheme();
const isNavbarOpened = useNavbar();
</script>

<template>
  <button @click="toggleNavbar" class="navbar-toggle-button">
    <span
      v-for="(span, i) in 3"
      :key="i"
      :class="[
        `button-line button-line_${span}`,
        {
          'button-line_theme-dark': theme == 'dark',
          'button-line_theme-light': theme == 'light',
          opened: isNavbarOpened,
        },
      ]"
    >
    </span>
  </button>
</template>

<style lang="sass">
.navbar-toggle-button
    position: relative
    width: 25px
    height: 20px
    overflow: hidden
    @media screen and (min-width: 768px)
        display: none
.button-line
    position: absolute
    width: 100%
    height: 2px
    left: 0
    transition: transform .3s ease-in-out, opacity .3s ease-in-out, top .3s ease-in-out, bottom .3s ease-in-out
    &_1
        top: 0
        transform-origin: center center
        &.opened
            transform: rotate(45deg) translateY(-50%)
            top: 50%
    &_2
        top: 50%
        transform: translateY(-50%)
        &.opened
            opacity: 0
            transform: translateX(30px)
    &_3
        bottom: 0
        transform-origin: center center
        &.opened
            transform: rotate(-45deg) translateY(50%)
            bottom: 50%

    &_theme-dark
        background-color: #E0E0E0
    &_theme-light
        background-color: #000
</style>

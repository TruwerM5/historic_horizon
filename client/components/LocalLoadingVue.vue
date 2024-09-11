<!-- Loader for banner etc. -->
<script lang="ts" setup></script>

<template>
  <div class="loader-block">
    <div class="loader-block__inner">
      <div class="loader-block__spinner"></div>
    </div>
  </div>
</template>

<style lang="sass">
.loader-block
    display: grid
    place-items: center
    width: 100%
    min-height: 200px
    background-color: #ddd
    &__inner
        display: grid
        place-items: center
    &__spinner
        width: 40px
        height: 40px
        border: 4px solid #fff
        border-radius: 50%
        border-top-color: #000
        animation: .5s infinite linear spin

@keyframes spin
    0%
        transform: rotate(0)
    100%
        transform: rotate(360deg)
</style>

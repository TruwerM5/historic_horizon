<script lang="ts" setup></script>

<template>
  <div class="loading">
    <div class="loading__inner">
      <div class="loading__spinner"></div>
    </div>
  </div>
</template>

<style lang="sass">
.loading
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: 2
    display: grid
    place-items: center
    background-color: rgba(200, 200, 200, 0.9)
    &__inner
        display: grid
        place-items: center
    &__spinner
        width: 60px
        height: 60px
        border: 7px solid #fff
        border-radius: 50%
        border-top-color: #555
        animation: .5s infinite linear spin

@keyframes spin
    0%
        transform: rotate(0)
    100%
        transform: rotate(360deg)
</style>

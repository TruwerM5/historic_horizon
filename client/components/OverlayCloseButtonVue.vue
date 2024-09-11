<script lang="ts" setup>
const theme = useCurrentTheme();
</script>

<template>
  <button
    :class="[
      'overlay-close-button',
      { 'overlay-close-button_theme-dark': theme == 'dark' },
    ]"
  >
    <!-- <span :class="['overlay-close-button__line overlay-close-button__line_1', theme == 'dark' ? 'dark':'']">
        </span>
        <span class="overlay-close-button__line overlay-close-button__line_2"></span> -->
    <span
      v-for="(span, i) in 2"
      :key="i"
      :class="[
        `overlay-close-button__line overlay-close-button__line_${span}`,
        theme == 'dark' ? 'dark' : '',
      ]"
    ></span>
  </button>
</template>

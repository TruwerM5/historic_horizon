<script lang="ts" setup>
const theme = useCurrentTheme();
</script>

<template>
  <button @click="toggleSearch" class="search-button header-button">
    <img
      :src="
        theme == 'dark'
          ? '/images/search-icon-dark.png'
          : '/images/search-icon-light.png'
      "
      alt="Поиск"
    />
  </button>
</template>

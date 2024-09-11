<script lang="ts" setup>
const theme = useCurrentTheme();

function toggleTheme() {
  if (theme.value == "dark") {
    theme.value = "light";
  } else {
    theme.value = "dark";
  }
  if (import.meta.client) {
    localStorage.setItem("theme", theme.value);
  }
}
</script>

<template>
  <button @click="toggleTheme" class="toggle-theme-button header-button">
    <img
      v-if="theme == 'dark'"
      src="/images/light-theme-icon.png"
      alt="Light theme"
      class="toggle-theme-icon"
      title="Светлая тема"
    />
    <img
      v-else-if="theme == 'light'"
      src="/images/dark-theme-icon.png"
      alt="Dark theme"
      class="toggle-theme-icon"
      title="Темная тема"
    />
  </button>
</template>

<style lang="sass" scoped></style>

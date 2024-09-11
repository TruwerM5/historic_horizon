<script lang="ts" setup>
import SearchVue from "./components/search/SearchVue.vue";
import SignInVue from "./components/signin/SignInVue.vue";
import { useUserStore } from "#imports";

const userStore = useUserStore();
const theme = useCurrentTheme();
const isSearchBlockVisible = useSearch();
const isSignInOpened = useSignInOverlay();
const isMounted = ref(false);
const searchStore = useSearchStore();



onBeforeMount(async () => {
  await userStore.checkIsAuthenticated();    
});

onMounted(() => {

  setTheme();

  if (import.meta.client) {
    searchStore.loadHistory();
  }
  setTimeout(() => {
    isMounted.value = true;
  }, 300);
});

function setTheme() {
  if (import.meta.client) {
    let localStorageTheme = localStorage.getItem("theme");

    if (
      localStorageTheme &&
      (localStorageTheme == "dark" || localStorageTheme == "light")
    ) {
      theme.value = localStorageTheme;
    }
  }
}


</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style lang="sass"></style>

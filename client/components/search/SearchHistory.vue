<script lang="ts" setup>
const searchHistory = useSearchStore();
const isMounted = ref(false);
if (import.meta.client) {
  setSearchHistory();
}

onMounted(() => {
  isMounted.value = true;
});

onBeforeRouteUpdate((to, from) => {
  setSearchHistory();
});

function setSearchHistory() {
  let storage = localStorage.getItem("search");
  if (storage) {
    searchHistory.history = JSON.parse(storage);
    console.log(searchHistory.history);
  }
}
</script>

<template>
  <div
    v-if="isMounted && searchHistory.getLength"
    @mouseover="searchHistory.open"
    class="search-history"
  >
    <span class="search-history__title">История</span>
    <ul class="search-history__list">
      <li
        v-for="(item, i) in searchHistory.history"
        :key="i"
        class="search-history__item"
      >
        <NuxtLink :to="{ path: '/search', query: { text: item } }">
          {{ item.toString() }}
        </NuxtLink>
        <button
          @click="searchHistory.removeFromHistory(item)"
          class="search-history__remove-button"
        >
          Удалить
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="sass">
.search-history
    position: absolute
    top: 100%
    left: 0
    width: 100%
    max-height: 0
    transition: max-height .2s
    overflow: hidden
    background-color: #fff
    z-index: 1
    &.opened
        max-height: 400px
    &__item
        display: flex
        justify-content: space-between
        margin-block: 10px
        padding-block: 5px
        &:hover
            background-color: #ccc
</style>

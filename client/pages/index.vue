<script lang="ts" setup>
useHead({
  htmlAttrs: {
    lang: "ru",
  },
});

useSeoMeta({
  description: "Исторический блог",
  twitterImage: "/images/favicon-light.png",
  ogImage: "/images/favicon-light.png",
  ogSiteName: "Historic Horizon",
});
</script>

<template>
  <div>
    <HeroVue />
    <RecentVue />
    
  </div>
</template>

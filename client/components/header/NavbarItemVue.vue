<script lang="ts" setup>
const theme = useCurrentTheme();

defineProps<{navitem: {id: number; title: string; to: string}}>()

</script>

<template>
    <li class="navbar-item">
        <NuxtLink
            :to="{ path: navitem.to }"
            @click="toggleNavbar"
            :class="[
              'navbar__link fs-transition',
              {
                'navbar__link_theme-dark': theme == 'dark',
                'navbar__link_theme-light': theme == 'light',
              },
            ]"
          >
            {{ navitem.title }}
          </NuxtLink>
    </li>
</template>
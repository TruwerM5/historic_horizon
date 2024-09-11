<script lang="ts" setup>
import NavbarItemVue from './NavbarItemVue.vue';


defineProps<{navbar: {id: number; title: string; to: string}[]}>();

</script>

<template>
    <ul class="navbar-list">
        <NavbarItemVue v-for="item in navbar" :key="item.id" :navitem="item" />
    </ul>
</template>

<style lang="sass" scoped>
.navbar-list
    display: flex
    flex-direction: column
    gap: 10px
    @media screen and (min-width: 768px)
        flex-direction: row
        gap: 45px
</style>
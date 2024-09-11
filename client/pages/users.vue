<script lang="ts" setup>
import { useUserStore } from '#imports';
import { listUsers } from '~/composables/api/list-users';
import type { User } from '~/types/user';
const userStore = useUserStore();

// const users = ref<Omit<User,"password" | "likes" | "articles">[] | undefined>([]);
const users = ref<Omit<User,"password" | "likes" | "articles">[] | undefined>([]);

function checkAuth() {
    if(!userStore.isAuthenticated || !userStore.isAdmin) {
        navigateTo('/');
        toggleSignInOverlay();
        return;
    }
}



onNuxtReady(async () => {
    watchEffect(async () => {
        await userStore.checkIsAuthenticated();
        checkAuth();
    });
    users.value = await listUsers();
});

</script>

<template>
    <section class="users page">
        <h1 class="users__title">Пользователи</h1>
        <div v-if="users" class="users__list">
            <div class="users__head">
                <span class="users__heading">ID</span>
                <span class="users__heading">Email</span>
                <span class="users__heading">Статус</span>
                <span class="users__heading">Статьи</span>
            </div>
            <AdminUserItemVue v-for="user in users" :key="user.id" :user="user" />
        </div>
    </section>
</template>

<style lang="sass" scoped>
.users
    padding: 0 15px 30px 15px
    font-family: Roboto
    &__title
        font-family: Oswald
        font-size: 24px
        text-align: center
        margin-bottom: 15px
        @media screen and (min-width: 768px)
            font-size: 32px
    &__list
        display: grid
        row-gap: 15px
    &__head
        position: relative
        display: grid
        grid-template-columns: min(30px) repeat(3, 1fr)
        gap: 10px
        justify-content: center
        align-content: center
        align-items: center
        padding-block: 8px
        border-bottom: 1px solid #333
    
</style>
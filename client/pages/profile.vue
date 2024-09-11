<script lang="ts" setup>

const theme = useCurrentTheme();
const userStore = useUserStore();

function checkAuth() {
    if(!userStore.isAuthenticated) {
        navigateTo('/');
        toggleSignInOverlay();
        
        return;
    }
}


onNuxtReady(() => {
    //if user reloads page
    
    watchEffect(async () => {
        await userStore.checkIsAuthenticated();
        checkAuth();
    });
});


</script>

<template>
    <section :class="['page profile', {'profile_theme-dark': theme === 'dark'}]">
        <h3 class="profile__title">Профиль</h3>
        <span v-if="userStore.user.role" class="profile__role">{{ $t(userStore.user.role) }}</span>
        <UserProfileInfoVue :user="userStore.user" />
    </section>
</template>

<style lang="sass">
.profile
    &__title
        font-family: Oswald
        font-size: 26px
        text-align: center
    &__role
        font-family: Roboto
        font-size: 18px
        text-align: center
        margin-bottom: 15px
</style>
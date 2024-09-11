<script lang="ts" setup>
import { toggleSignInOverlay } from "~/composables/signin";
import { useUserStore } from "~/stores/user";
import { logout } from "~/composables/api/logout.post";
const userStore = useUserStore();


async function submitLogout() {
  const data = await logout();
  userStore.logoutUser();
  console.log(data.message);

}

</script>

<template>
  <template v-if="userStore.isAuthenticated">
    <button @click="submitLogout" class="sign-in-button">Выйти</button>
  </template>
  <template v-else>
    <button @click="toggleSignInOverlay" class="sign-in-button">Войти</button>
  </template>
  
</template>

<style lang="sass">
.sign-in-button
    font-family: Roboto
    @media screen and (min-width: 768px)
        font-size: 18px
</style>

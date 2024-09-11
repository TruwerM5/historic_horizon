
<script lang="ts" setup>

import NavbarListVue from './NavbarListVue.vue';

const theme = useCurrentTheme();
const isNavbarOpened = useNavbar();
const userStore = useUserStore();
const current_navbar = ref<any>([]);
const user_navbar_list = ref([
  {
    id: 1,
    title: "Главная",
    to: "/",
  },
  {
    id: 2,
    title: "Архив",
    to: "/latest",
  },
  // {
  //   id: 3,
  //   title: "Поддержать проект",
  //   to: "/support",
  // },
  {
    id: 3,
    title: "О проекте",
    to: "/about",
  },
  // {
  //   id: 4,
  //   title: "Темы",
  //   to: "/topics",
  // },
]);

const authenticated_navbar_list = ref([
{
    id: 1,
    title: "Главная",
    to: "/",
  },
  {
    id: 2,
    title: "Архив",
    to: "/latest",
  },
  {
    id: 3,
    title: "Поддержать проект",
    to: "/support",
  },
  {
    id: 4,
    title: "Темы",
    to: "/topics",
  },{
    id: 5,
    title: "Профиль",
    to: "/profile",
  },
])

const author_navbar_list = ref([
  {
    id: 1,
    title: 'Главная',
    to: '/'
  },{
    id: 2,
    title: 'Профиль',
    to: '/profile',
  },{
    id: 3,
    title: 'Создать',
    to: '/create'
  },{
    id: 4,
    title: 'Мои статьи',
    to: '/my-articles'
  }
]);

const admin_navbar_list = ref([
  {
    id: 1,
    title: "Главная",
    to: "/",
  },{
    id: 2,
    title: "Профиль",
    to: "/profile",
  },{
    id: 3,
    title: "Пользователи",
    to: "/users",
  }
])

watchEffect(() => {
  if(userStore.isAuthenticated) {
    if(userStore.isAdmin) {
      current_navbar.value = admin_navbar_list.value;
      return;
    }
    if(userStore.isAuthor) {
      current_navbar.value = author_navbar_list.value;
      return;
    }
    current_navbar.value = authenticated_navbar_list.value;
    return;
  }

  current_navbar.value = user_navbar_list.value;
  
})
</script>

<template>
  <div :class="['navbar-wrapper', { opened: isNavbarOpened }]">
    <nav class="navbar">
      <!-- <ul class="navbar__list">
        <li v-for="item in user_navbar_list" :key="item.id" class="navbar__item">
          <NuxtLink
            :to="{ path: item.to }"
            @click="toggleNavbar"
            :class="[
              'navbar__link fs-transition',
              {
                'navbar__link_theme-dark': theme == 'dark',
                'navbar__link_theme-light': theme == 'light',
              },
            ]"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul> -->
      <NavbarListVue :navbar="current_navbar" />
    </nav>
  </div>
</template>

<style lang="sass">
.navbar-wrapper
    position: absolute
    width: 100%
    left: 0
    top: 100%
    max-height: 0
    z-index: 1
    overflow: hidden
    transition: max-height .6s ease-in-out
    background-color: inherit
    &.opened
        max-height: 500px
    @media screen and (min-width: 768px)
        max-height: none
.navbar
    padding-block: 15px
    font-family: Roboto

    display: flex
    justify-content: center
    border-top: 1px solid #555
    border-bottom: 1px solid #555
    @media screen and (min-width: 768px)
        padding-block: 7px
    &__list
        display: flex
        flex-direction: column
        gap: 10px
        @media screen and (min-width: 768px)
            flex-direction: row
            gap: 45px

    &__link
        font-size: 18px
        &_theme-dark
            color: #E0E0E0
        &_theme-light
            color: #000
        @media screen and (min-width: 768px)
            font-size: 20px

            &:hover
              transition: opacity .4s
              opacity: 0.6
              text-decoration: underline
</style>

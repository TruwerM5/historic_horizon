<script lang="ts" setup>
import { toggleSignInOverlay, useSignInOverlay } from "~/composables/signin";
import { useUserStore } from "~/stores/user";
import { login } from "~/composables/api/login.post";
import { signUp } from "~/composables/api/signup";

const userStore = useUserStore();
const theme = useCurrentTheme();
const isSignInOpened = useSignInOverlay();
const signInForm = useSignInForm();
const email = ref("");
const password = ref("");
const username = ref("");
const password_2 = ref("");

const pending = ref(false);

const error_message = ref("");

function onInputChange(e: any) {
  if (e.target.value != "") {
    e.target.classList.add("focused");
  } else {
    e.target.classList.remove("focused");
  }
}

function switchForms(form: "login" | "signup") {
  username.value = "";
  password.value = "";
  switchSignInForm(form);
}


async function submitLogin() {
  pending.value = true;
  try {
    const request = await login(email.value, password.value);
    userStore.setUser(request.user);
    toggleSignInOverlay();
    error_message.value = "";
  } catch(e: any) {
    switch(e.response.status) {
      case(401):
        error_message.value = "Неверный логин или пароль.";
      break;
      case(403):
        error_message.value = "Пользователь заблокирован.";
      break;
      default:
        error_message.value = "Произошла ошибка.";
    }
  }
  pending.value = false;
}


async function submitSignup() {
  pending.value = true;
  try {
    const request = await signUp(email.value, username.value, password.value, password_2.value);
    userStore.setUser(request.user);
    toggleSignInOverlay();
    error_message.value = "";
  } catch(e: any) {
    error_message.value = "Ошибка";
  }
  pending.value = false;

}


onBeforeUpdate(() => {
  clearForms();
});

function clearForms() {
  username.value = "";
  email.value = "";
  password.value = "";
  password_2.value = "";

}

watch(error_message, () => {

  if(error_message.value) {
    setTimeout(() => {
      error_message.value = '';
    }, 5000)
  }

});

</script>

<template>
  <Transition name="fade">
    <div
      v-if="isSignInOpened"
      :class="['sign-in overlay', { 'overlay_theme-dark': theme == 'dark' }]"
    >
      <OverlayCloseButtonVue @click="toggleSignInOverlay" />
      <div class="sign-in__form-wrapper">
        <TransitionGroup name="form">
          <form
            v-if="signInForm == 'login'"
            @submit.prevent
            class="sign-in__form"
          >
            <h3 class="sign-in__title">Вход</h3>
            <label for="username_login" class="sign-in__label">
              <input
                v-model="email"
                class="sign-in__input"
                type="text"
                name="username"
                id="username_login"
                @change="onInputChange"
              />
              <span class="sign-in__text">Логин</span>
            </label>
            <label for="password_login" class="sign-in__label">
              <input
                v-model="password"
                class="sign-in__input"
                type="password"
                name="password"
                id="password_login"
                @change="onInputChange"
              />
              <span class="sign-in__text">Пароль</span>
            </label>
            <button @click="submitLogin" type="button" class="primary-button sign-in__submit-button">
              Войти
            </button>
            <span v-if="error_message" class="error-message text-center">
              {{ error_message }}
            </span>
            <button
              type="button"
              @click="switchForms('signup')"
              class="sign-in__switch-form-button"
            >
              Регистрация
            </button>
          </form>
          <form
            v-if="signInForm == 'signup'"
            @submit.prevent
            class="sign-in__form"
          >
            <h3 class="sign-in__title">Регистрация</h3>
            <label for="sign-up_email" class="sign-in__label">
              <input
                v-model="email"
                type="text"
                name="sign-up_email"
                id="sign-up_email"
                class="sign-in__input"
                @change="onInputChange"
              />
              <span class="sign-in__text">Адрес электронной почты</span>
            </label>
            <label for="sign-up_name" class="sign-in__label">
              <input
                v-model="username"
                type="text"
                name="sign-up_name"
                id="sign-up_name"
                class="sign-in__input"
                @change="onInputChange"
              />
              <span class="sign-in__text">Имя</span>
            </label>
            <label for="sign-up_pass" class="sign-in__label">
              <input
                v-model="password"
                type="password"
                name="sign-up_pass"
                id="sign-up_pass"
                class="sign-in__input"
                @change="onInputChange"
              />
              <span class="sign-in__text">Пароль</span>
            </label>
            <label for="sign-up_pass2" class="sign-in__label">
              <input
                v-model="password_2"
                type="password"
                name="sign-up_pass2"
                id="sign-up_pass2"
                class="sign-in__input"
                @change="onInputChange"
              />
              <span class="sign-in__text">Подтвердите пароль</span>
            </label>
            <button type="button" 
            class="primary-button sign-in__submit-button"
            @click="submitSignup">
              Зарегистрироваться
            </button>
            <button
              type="button"
              @click="switchForms('login')"
              class="sign-in__switch-form-button"
            >
              Вход
            </button>
          </form>
        </TransitionGroup>
      </div>
    </div>
    
  </Transition>
  <LoadingVue v-if="pending" />
</template>

<style lang="sass" scoped>
.sign-in
    &__form
        max-width: 400px
        padding: 25px 30px
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
        background-color: #eeeeee
        @media screen and (min-width: 600px)
          width: 400px
    &__title
        font-size: 28px
        text-align: center
        margin-bottom: 30px
        color: #333
    &__label
        position: relative
        margin-bottom: 30px
    &__text
        position: absolute
        left: 5px
        top: 50%
        height: 100%
        display: flex
        align-items: center
        transform: translateY(-50%)
        font-size: 18px
        transition: all .2s

    &__input
        width: 100%
        padding: 5px
        font-size: 20px
        background-color: transparent
        border-bottom: 1px solid #333
        transition: border-bottom-color .5s
        &:focus
            border-bottom: 2px solid #1257e0
            & + span
                font-size: 16px
                top: 0
                transform: translateY(calc( -100% + 10px ))
        &.focused + span
            font-size: 16px
            top: 0
            transform: translateY(calc( -100% + 10px ))
    &__switch-form-button
        font-size: 18px
        color: #4f8ed1
        text-decoration: underline
        text-align: center
        margin: 30px auto 0 auto
    &__submit-button
        font-size: 20px

.sign-in.overlay_theme-dark
    .sign-in__text
        color: #333
    .sign-in__input
        color: #333
    //     &:focus + .sign-in__text
    //         color: #fff
</style>

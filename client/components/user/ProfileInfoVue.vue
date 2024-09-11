<script lang="ts" setup>
import { editPassword } from '~/composables/api/edit-password';
import { editProfile } from '~/composables/api/edit-profile';
import type { User } from '~/types/user';

const props = defineProps<{user: User;}>();

const theme = useCurrentTheme();

const isEditing = ref(false);
const isEditingPassword = ref(false);
const pending = ref(false);

const userStore = useUserStore();

const email = ref(props.user.email);
const username = ref(props.user.username);
const old_password = ref('');
const password = ref('');
const password_2 = ref('');

const error_message = ref('');
const success_message = ref('');

function switchForm() {
    isEditing.value = !isEditing.value;
    
    email.value = isEditing.value ? userStore.user.email : '';
    username.value = isEditing.value ? userStore.user.username : '';
    
}

function cancelEditing() {
    email.value = props.user.email;
    username.value = props.user.username;
    switchForm();
}

function switchPasswordForm() {
    isEditingPassword.value = !isEditingPassword.value;
}

function cancelEditingPassword() {
    old_password.value = '';
    password.value = '';
    password_2.value = '';
    switchPasswordForm();
}

async function submitEditions() {
    
    
    pending.value = true;
    try {
        const req = await editProfile(email.value, username.value);
        if(req) {
            switchForm();
            userStore.setUser(req.user);
            success_message.value = 'Успешно.';

        }
    }catch(e: any) {
        if(e.status == 400) {
            console.log("BAD REQUEST");
            error_message.value = "Неверные данные.";
            console.log(error_message.value);
        }
        console.log(e);
    }
    pending.value = false;
}



async function submitPasswordEdition() {


    
    const validated =  validatePasswords(password.value, password_2.value);
    if(validated) {
        error_message.value = validated;
        return;
    }

    pending.value = true;
    const req = await editPassword(old_password.value, password.value);

    if(req.user) {
        error_message.value = "";
        success_message.value = "Пароль успешно изменен.";
    } else if(req.error) {
        success_message.value = "";
        error_message.value = req.error;
        
    }

    pending.value = false;
    
}



</script>

<template>
    <div :class="['profile-info', {'profile-info_theme-dark': theme === 'dark'}]">
        <div class="profile-info__field">
            <span class="profile-info__label">Логин: </span>
            <input v-if="isEditing"
            type="text"
            name="email" 
            id="email"
            v-model="email"
            class="profile-info__input input">
            <span v-else class="profile-info__field-text"> {{ userStore.user.email }}</span>
        </div>
        <div class="profile-info__field">
            <span class="profile-info__label">Имя: </span>
            <input v-if="isEditing"
            type="text"
            name="email" 
            id="username"
            v-model="username"
            class="profile-info__input input">
            <span v-else class="profile-info__field-text"> {{ userStore.user.username }}</span>
        </div>
        <div v-if="isEditing" class="profile-info__buttons">
            <button @click="submitEditions" class="profile-info__save-button primary-button">Сохранить</button>
            <button @click="cancelEditing" class="profile-info__cancel-button">Отмена</button>
        </div>
        <button v-else 
            @click="switchForm" 
            class="profile-info__edit-button primary-button">
            Редактировать
        </button>
        <template v-if="isEditingPassword">
            <div class="profile-info__password-field">
                <span class="profile-info__label">Текущий пароль:</span>
                <input v-model="old_password"
                    type="password" 
                    name="old_password" 
                    id="old_password"
                    class="profile-info__input input">
            </div>
            <div class="profile-info__password-field">
                <span class="profile-info__label">Новый пароль:</span>
                <input v-model="password"
                    type="password" 
                    name="password" 
                    id="password"
                    class="profile-info__input input">
            </div>
            <div class="profile-info__password-field">
                <span class="profile-info__label">Подтвердите новый пароль:</span>
                <input v-model="password_2"
                    type="password" 
                    name="password_2" 
                    id="old_password_2"
                    class="profile-info__input input">
            </div>
            <span v-if="error_message" class="error-message">
                    {{ error_message }}
            </span>
            <span v-if="success_message" class="success-message">
                {{ success_message }}
            </span>
            <div class="profile-info__buttons">
                <button @click="submitPasswordEdition" class="profile-info__save-button primary-button">Сохранить</button>
                <button @click="cancelEditingPassword" class="profile-info__cancel-button">Отмена</button>
            </div>
        </template>
        
        <button v-if="!isEditingPassword" @click="switchPasswordForm" 
        class="profile-info__edit-password-button yellow-button">
            Изменить пароль
        </button>
        <LoadingVue v-if="pending" />
    </div>
</template>

<style lang="sass" scoped>
.profile-info
    max-width: 500px
    margin: 0 auto
    font-family: Roboto
    font-size: 18px
    display: flex
    flex-direction: column
    gap: 15px
    &__title
        font-family: Oswald
        font-size: 28px
        text-align: center
        margin-bottom: 15px
    &__info
        display: flex
        flex-direction: column
        gap: 15px
    &__field
        display: grid
        grid-template-columns: auto 250px
        align-items: center
        column-gap: 5px
        border-bottom: 1px solid #000
    &__field-text
        padding: 5px
    &__input
        padding: 5px
        width: 100%
        font-size: 18px
        margin: 0
        border: none
    &__buttons
        display: flex
        gap: 20px
        justify-content: center
    &__save-button
        margin: 0
    &__cancel-button
        padding: 10px 25px
        border: 2px solid #000
    &__edit-password-button
        width: fit-content
        padding: 10px 25px
        margin: 0 auto
.profile-info
    &_theme-dark
        .profile-info__input
            color: #000
        .profile-info__cancel-button
            border-color: #fff
        .profile-info__field
            border-color: #fff
</style>
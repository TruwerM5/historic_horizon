<script lang="ts" setup>
import { setUserStatus } from '~/composables/api/admin/set-user-status';
import type { User } from '~/types/user';

const theme = useCurrentTheme();
const props = defineProps<{user: Omit<User, "password" | "articles" | "likes">}>();
const currentStatus = ref<"ACTIVE"| "BLOCKED">(props.user.status);
const pending = ref(false);

async function onStatusChange(e: any) {
    pending.value = true;
    const request = await setUserStatus(currentStatus.value, props.user.id);
    if(request?.user) {
        currentStatus.value = request.user.status;
    }
    pending.value = false;

}

</script>


<template>
    <div class="user-item">
        <span class="user-item__text">{{ user.id }}</span>
        <span class="user-item__text">
            {{ user.email }} <br>
            {{ $t(user.role) }}
        </span>
        <span class="user-item__text">
            <select 
            @change="onStatusChange" 
            name="user-item__status" 
            id="user_status" 
            v-model="currentStatus"
            :class="['user-item__select', theme == 'dark' ? 'user-item__select_theme-dark' : '']">
                <option 
                :selected="user.status == 'ACTIVE'"
                class="user-item__option">
                    ACTIVE
                </option>
                <option 
                :selected="user.status == 'BLOCKED'"
                class="user-item__option">
                    BLOCKED
                </option>
            </select>
        </span>
        <span class="user-item__text">
            <NuxtLink v-if="user.role == 'AUTHOR'" :to="{path: `/articles/author/${user.username}`}">
                {{ user._count?.articles }}
            </NuxtLink>
        </span>
        <LoadingVue v-if="pending" />
    </div>
</template>

<style lang="sass" scoped>
.user-item
    position: relative
    display: grid
    grid-template-columns: min(30px) repeat(3, 1fr)
    gap: 10px
    justify-content: center
    align-content: center
    align-items: center
    padding-block: 8px
    border-bottom: 1px solid #333
    &__text
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
    &__text
        font-size: 12px
        @media screen and (min-width: 600px)
            font-size: 14px
        @media screen and (min-width: 768px)
            font-size: 16px
        @media screen and (min-width: 768px)
            font-size: 20px
    &__select
        background-color: transparent
        padding: 3px
        outline: none
    &__option
        color: #000
</style>
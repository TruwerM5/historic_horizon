<script lang="ts" setup>
import type Article from '~/types/article';

const emits = defineEmits(['close-modal']);
const props = defineProps<{article_id: string}>()
const pending = ref(false);
async function submitDeleteArticle() {

    pending.value = true;
    const req = await deleteArticle(props.article_id);
    if(req) {
        console.log("Deleted");
    } else {
        console.log("Error");
    }
    pending.value = false;
    closeModal();
  
}

function closeModal() {
    emits('close-modal');
}
</script>

<template>
    <ModalWindowVue>
        <div class="submit-delete-form">
        <span class="submit-delete-form__text">Удалить статью?</span>
            <div class="flex justify-between gap-[10px]">
                <button 
                class="submit-delete-form__submit-button danger-button"
                @click="submitDeleteArticle"
                >Удалить</button>
                <button 
                class="submit-delete-form__cancel-button primary-button"
                @click="closeModal">Отмена</button>
            </div>
        </div>
        <LoadingVue v-if="pending" />
    </ModalWindowVue>
</template>
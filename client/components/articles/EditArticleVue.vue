<script lang="ts" setup>
import type Article from '~/types/article';
const theme = useCurrentTheme();
const emits = defineEmits(['close-edit']);
const props = defineProps<{ article: Article; }>()
const { article } = props;
const edited_article = article;
const current_banner = ref(article.banner);
const new_banner_file = ref<any>(null);
const new_banner_obj_url = ref<any>(null);
const new_tag = ref('');
function cancelEdit() {
    emits('close-edit');
}

function onBannerLoad(e: any) {
    new_banner_file.value = e.target.files[0];
    new_banner_obj_url.value = URL.createObjectURL(new_banner_file.value);
}

function addTag() {
    if(new_tag.value) {
        edited_article.tags.push(new_tag.value);
        new_tag.value = '';
    }
}

function removeTag(tag: string) {
    edited_article.tags = edited_article.tags.filter(item => item != tag);
}

async function submitEdit() {
    const formData = new FormData();
    formData.append('title', props.article.title);
    formData.append('content', props.article.articleContent.content);
    formData.append('tags', JSON.stringify(props.article.tags));
    if(new_banner_file.value) {
        formData.append('banner', new_banner_file.value);
    }
    const edited_article = await editArticle(props.article.id, formData);
    console.log(edited_article);

}

</script>

<template>
    <ModalWindowVue class="modal-window">
        <div :class="['edit-article-form', {'theme-dark': theme == 'dark'}]">
            <OverlayCloseButtonVue @click="cancelEdit" />
            <div class="edit-article-form__inner">
                <div class="edit-article-form__item">
                    <label for="title" class="edit-article-form__label">
                        <p class="edit-article-form__head">
                        Название статьи
                        </p>
                        <input 
                          type="text" 
                          name="title" 
                          id="title" 
                          v-model="edited_article.title"
                          class="edit-article-form__input input"
                        />
                    </label>
                </div>
                <div class="edit-article-form__item">
                    <label for="banner" class="edit-article-form__label">
                        <p class="edit-article-form__head">
                            Баннер
                        </p>
                        <img 
                          :src="`http://localhost:3001/images/${current_banner}`" 
                          :alt="edited_article.banner"
                          class="edit-article-form__image"
                        />
                        <img 
                          v-if="new_banner_obj_url" 
                          :src="new_banner_obj_url" 
                          alt="new banner"
                          class="edit-article-form__image"
                        />
                        <input @change="onBannerLoad" type="file" name="banner" id="banner">
                    </label>
                </div>
                <div class="edit-article-form__item">
                    <label for="content" class="edit-article-form__label">
                        <p class="edit-article-form__head">
                            Содержание
                        </p>
                        <textarea 
                          name="content" 
                          id="content"
                          v-model="edited_article.articleContent.content"
                          class="edit-article-form__textarea textarea">

                        </textarea>
                    </label>
                </div>
                <div class="edit-article-form__item">
                    <label for="tags" class="edit-article-form__label">
                        <p class="edit-article-form__head">
                            Теги
                        </p>
                        <div class="edit-article-form__tags relative w-fit">
                            <TransitionGroup name="list">
                                <button 
                                    v-for="tag,i in edited_article.tags" 
                                    :key="i" 
                                    @click="removeTag(tag)"
                                    class="edit-article-form__tag">
                                        {{ tag }}
                                </button>
                            </TransitionGroup>
                        </div>
                        <input 
                          v-model="new_tag" 
                          type="text" 
                          name="tags" 
                          id="tags" 
                          class="input"
                        />
                        <button 
                          @click="addTag"
                          class="edit-article-form__add-tag-button green-button">
                            Добавить
                        </button>
                        
                    </label>
                </div>
                <div class="edit-article-form__actions">
                    <button @click="submitEdit"
                    class="primary-button edit-article-form__submit-button">
                    Сохранить
                    </button>
                    <button @click="cancelEdit" class="cancel-button yellow-button">
                        Отмена
                    </button>
                </div>
                
            </div>
        </div>
    </ModalWindowVue>
</template>

<style lang="sass" scoped>
.modal-window
    overflow-y: scroll
.edit-article-form
    width: 100%
    height: 100%
    padding: 60px 30px
    background-color: #f3f3f3
    &.theme-dark
        background-color: #2c2c2c
        &__input
            background-color: #000
    &__inner
        max-width: 600px
        margin: 0 auto
        display: flex
        flex-direction: column
        gap: 30px
    &__head
        font-family: Roboto
        font-size: 18px
        margin-bottom: 10px
    &__image
        max-width: 300px
        margin: 10px auto
    &__textarea
        padding: 20px 15px
        font-size: 20px
        width: 100%
        height: 600px
    &__tags
        display: flex
        flex-wrap: wrap
        gap: 10px
        margin-bottom: 10px
    &__tag
        display: flex
        align-items: center
        gap: 5px
        font-family: Roboto
        padding: 5px 7px
        border: 1px solid #333
        &::after
            content: ''
            display: inline-block
            width: 10px
            height: 2px
            background-color: #333
        &:hover
            background-color: #ff3333
            color: #fff
    &__actions
        display: flex
        justify-content: center
        gap: 25px
    &__submit-button
        margin: 0
</style>
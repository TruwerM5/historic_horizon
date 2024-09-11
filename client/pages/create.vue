<script lang="ts" setup>


const theme = useCurrentTheme();
const title = ref("");
const content = ref<string>("");
const tags = ref<string[]>([]);
const currentTag = ref("");
const imagePreviewUrl = ref("");
const fileName = ref<any>();
const formElem = ref<any>();
const isMounted = ref(false);
const titleTextareaHeight = ref<any>(null);
const userStore = useUserStore();
const pending = ref(false);
const success_message = ref('');
const error_message = ref('');

function addTag() {
  tags.value.push(currentTag.value);
  currentTag.value = "";
}

function removeTagByIndex(index: number) {
  tags.value = tags.value.filter((tag, i) => i != index);
}

async function postArticle() {
  pending.value = true;
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("banner", fileName.value);
  formData.append("tags", JSON.stringify(tags.value));
  formData.append("content", content.value);

  try {  
    await $fetch("http://localhost:3001/api/articles/create", {
      method: "POST",
      body: formData,
      credentials: "include"
    });
    success_message.value = "Статья добавлена";
  } catch(e: any) {
    if(e.status == 401) {
      toggleSignInOverlay();
      userStore.logoutUser();
    }
    error_message.value = "Произошла ошибка: " + e.message;
    
  }
  

  pending.value = false;
  setTimeout(clearForm, 3000);
}

function onFileChange(e: any) {
  const file = e.target.files[0];
  imagePreviewUrl.value = URL.createObjectURL(file);
  fileName.value = e.target.files[0];
}

function removeBanner() {
  imagePreviewUrl.value = "";
}

onMounted(() => {
  isMounted.value = true;
});


onNuxtReady(() => {
  if(!userStore.isAuthor) {
    return navigateTo('/404')
  }
});


function clearForm() {
  error_message.value = "";
  success_message.value = "";
  title.value = "";
  content.value = "";
  tags.value = [];
  currentTag.value = "";
  imagePreviewUrl.value = "";
  fileName.value = "";
}

</script>

<template>
  <div
    v-if="isMounted"
    :class="['create-article', { 'theme-dark': theme == 'dark' }]"
  >
    <form
      @submit.prevent
      enctype="multipart/form-data"
      class="create-article__form"
      ref="formElem"
    >
      <h1 class="create-article__title">Опубликовать статью</h1>
      <label for="title" class="mb-[20px] create-article__label">
        <span class="create-article__text">Название статьи</span>
        <textarea
          name="title"
          id="title"
          v-model="title"
          maxlength="65"
          class="input textarea"
          ref="titleTextareaHeight"
        >
        </textarea>
      </label>
      <div class="create-article__banner mb-[20px]">
        <span class="create-article__text"> Баннер </span>
        <div v-if="imagePreviewUrl" class="banner-preview">
          <img
            :src="imagePreviewUrl"
            :alt="imagePreviewUrl"
            class="banner-preview__image"
          />
          <button @click="removeBanner" class="remove-input-button right-0">
            &mdash; Удалить
          </button>
        </div>
        <label v-else for="banner" class="create-article__label">
          <input @change="onFileChange" type="file" name="banner" id="banner" />
        </label>
      </div>
      <label for="content" class="create-article__label">
        <span class="create-article__text"> Содержание статьи </span>
        <textarea
          v-model="content"
          name="content"
          id="content"
          class="input textarea create-article__textarea"
        >
        </textarea>
      </label>

      <label for="tag" class="create-article__label mb-[20px]">
        <span class="create-article__text">Теги</span>
        <input
          type="text"
          name="tag"
          id="tag"
          v-model="currentTag"
          class="input"
          :class="{ 'create-article__input_theme-dark': theme == 'dark' }"
          placeholder="Локация, события и т.д."
        />
      </label>

      <button
        @click="addTag"
        class="add-tag-button create-article__button mb-[10px] green-button"
      >
        Добавить
      </button>
      <div class="tags">
        <button
          v-for="(tag, i) in tags"
          :key="i"
          @click="removeTagByIndex(i)"
          class="create-article__button mb-[20px]"
        >
          &mdash;{{ tag }}
        </button>
      </div>
      <button type="submit" class="search-button primary-button" @click="postArticle">
        Опубликовать
      </button>
    </form>
    <LoadingVue v-if="pending" />
    <ModalWindowVue 
    v-if="success_message"
    >
    
      <div class="success-message">
        <p class="success-message__text">
          {{ success_message }}
        </p>
      </div>
    </ModalWindowVue>
    <ModalWindowVue 
    v-else-if="error_message">
      <div class="error-message">
        <p class="error-message__text">
          {{ error_message }}
        </p>
      </div>
    </ModalWindowVue>
  </div>
</template>

<style lang="sass">
.create-article
    padding: 30px 20px
    font-family: Roboto
    max-width: 600px
    margin: 0 auto
    &__title
        font-size: 28px
        text-align: center
        margin-bottom: 20px
        font-family: Oswald
    &__text
        font-size: 18px
        margin-bottom: 10px
        @media screen and (min-width: 768px)
          font-size: 24px
    &__textarea
      height: 400px
      font-size: 28px

.content-wrapper
    position: relative
    width: fit-content


.remove-input-button
    position: absolute
    top: 50%
    transform: translateY(-50%)
    width: max-content
    color: #000
    font-size: 12px
    border: 1px solid #f5424e
    padding: 3px 6px
    color: #f5424e


.banner-preview
    position: relative
    width: fit-content
    &__image
        width: 75%

.success-message
  padding: 20px
  color: #000
  background-color: #ccc
</style>

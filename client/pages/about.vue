<template>
  <ClientOnly>
    <div class="page about">
      <h1 class="page-title">О проекте</h1>
      <p class="about__text">
        Проект создан для всех, кто увлекается изучением прошлого, 
        стремится лучше понять события, идеи и личности, которые формировали наш мир.
      </p>
      <p class="about__text">
        Цель нашего блога — сделать исторические знания доступными и 
        интересными для широкой аудитории. Здесь вы найдёте увлекательные 
        статьи на различные темы: от античности и Средневековья до современных событий. 
        Мы стремимся рассказывать о прошлом так, чтобы оно стало ближе и понятнее.
      </p>
      <p class="about__text">
        Блог будет полезен как студентам и школьникам, изучающим историю, так и всем, 
        кто просто хочет расширить кругозор и узнать что-то новое.
      </p>
    </div>
  </ClientOnly>
  
</template>

<style lang="sass" scoped>
.about
  padding: 10px 20px
  &__text
    font-size: 20px
    margin-bottom: 15px
    @media screen and (min-width: 768px)
      font-size: 24px
</style>

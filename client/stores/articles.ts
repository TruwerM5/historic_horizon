import type Article from "~/types/article";
import type ArticleContent from "~/types/article-content";

export const useArticlesStore = defineStore("articles", {
  state: () => {
    return {
      cachedArticles: <Article[]>[],
      cachedArticlesContent: <ArticleContent[]>[],
    };
  },
  actions: {
    addArticleToCache(article: Article) {
      this.cachedArticles.push(article);
    },
    addArticleContentToCache(articleConent: ArticleContent) {
      this.cachedArticlesContent.push(articleConent);
    },
    getArticleFromCache(id: number): Article | null {
      return this.cachedArticles.find((item) => item.id == id) || null;
    },
    getArticleContentFromCache(id: number) {
      return this.cachedArticlesContent.find((item) => item.id == id);
    },
  },
});

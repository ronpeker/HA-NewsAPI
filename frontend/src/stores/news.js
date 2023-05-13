import { defineStore } from "pinia";

export const useNewsStore = defineStore({
  id: "news",
  state: () => ({
    articles: [],
    activeArticle: {},
    lastPage: 0,
    maxArticles: 0,
  }),
  actions: {
    setArticles(a) {
      this.articles = a;
    },
    setActiveArticle(a) {
      this.activeArticle = a;
    },
    setLastPage(p) {
      this.lastPage = p;
    },
    setMaxArticles(m) {
      this.maxArticles = m;
    },
  },
});

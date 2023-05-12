import { defineStore } from 'pinia'

export const useNewsStore = defineStore({
    id: 'news',
    state: () => ({
        articles: [],
          activeArticle: {}
    }),
    actions: {
        setArticles(a) {
            this.articles = a;
        },
        setActiveArticle(a) {
            this.activeArticle = a;
        }
    }
});

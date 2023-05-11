import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
    id: 'filters',
    state: () => ({
        keyword: '',
        category: '',
    }),
    actions: {
        setKeyword(q) {
            this.keyword = q;
        },
        setCategory(c) {
            this.category = c;
        },
    }
});

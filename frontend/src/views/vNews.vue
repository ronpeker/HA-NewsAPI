<template>
  <div class="container-fluid">
    <h1 class="row justify-content-center">Tomax News</h1>
    <cFilterPane @updatedFilters="getNews(true)" class="mb-5" />
    <cArticle v-for="article in articles" :article="article" />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useFiltersStore } from "../stores/filters.js";
import { useNewsStore } from "../stores/news.js";
import axios from "axios";

import cFilterPane from "@/components/cFilterPane.vue";
import cArticle from "@/components/cArticle.vue";

export default {
  data() {
    return {
      articles: [],
    };
  },
  components: {
    cFilterPane,
    cArticle,
  },
  computed: {
    ...mapStores(useFiltersStore, useNewsStore),
  },
  mounted() {
    this.getNews(false);
  },
  methods: {
    getNews(update) {
      if (!update && this.newsStore.articles.length > 0) {
        this.articles = this.newsStore.articles;
      } else {
        let base_url = '/api/news';
        if (this.filtersStore.keyword) {
          base_url = base_url + '?keyword=' + this.filtersStore.keyword;
          if (this.filtersStore.category) {
            base_url = base_url + '&category=' + this.filtersStore.category;
          }
        } else if (this.filtersStore.category) {
          base_url = base_url + '?category=' + this.filtersStore.category;
        }
        axios.get(base_url).then((res) => {
          this.articles = res.data.articles;
          this.newsStore.setArticles(this.articles);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

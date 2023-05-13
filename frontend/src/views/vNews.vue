<template>
  <div class="container-fluid">
    <h1 class="row justify-content-center">Tomax News</h1>
    <cFilterPane @updatedFilters="getNews(true)" class="mb-5" />
    <cArticle v-for="article in articles" :article="article" />
    <cObserver
      v-if="this.articles.length"
      @intersect="intersected"
      :options="{ rootMargin: '500px' }"
    />
    <h5 v-if="endMsg" class="row justify-content-center m-3">{{ endMsg }}</h5>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useFiltersStore } from "../stores/filters.js";
import { useNewsStore } from "../stores/news.js";
import axios from "axios";

import cFilterPane from "@/components/cFilterPane.vue";
import cArticle from "@/components/cArticle.vue";
import cObserver from "@/components/cObserver.vue";

export default {
  data() {
    return {
      articles: [],
      endMsg: "",
    };
  },
  components: {
    cFilterPane,
    cArticle,
    cObserver,
  },
  computed: {
    ...mapStores(useFiltersStore, useNewsStore),
  },
  mounted() {
    this.getNews(false);
  },
  methods: {
    getNews(update) {
      this.endMsg = "";
      if (!update && this.newsStore.articles.length > 0) {
        this.articles = this.newsStore.articles;
      } else {
        let base_url = "/api/news?page=1";
        if (this.filtersStore.keyword) {
          base_url = base_url + "&keyword=" + this.filtersStore.keyword;
        }
        if (this.filtersStore.category) {
          base_url = base_url + "&category=" + this.filtersStore.category;
        }
        axios.get(base_url).then((res) => {
          this.articles = res.data.articles;
          this.newsStore.setMaxArticles(parseInt(res.data.totalResults));
          this.newsStore.setLastPage(1);
          this.newsStore.setArticles(this.articles);
        });
      }
    },
    intersected() { // Reaching end of page
      if (this.articles.length < this.newsStore.maxArticles) {
        const nextPage = this.newsStore.lastPage + 1;
        let base_url = `/api/news?page=${nextPage}`;
        if (this.filtersStore.keyword) {
          base_url = base_url + "&keyword=" + this.filtersStore.keyword;
        }
        if (this.filtersStore.category) {
          base_url = base_url + "&category=" + this.filtersStore.category;
        }
        axios.get(base_url).then((res) => {
          this.articles = this.articles.concat(res.data.articles);
          this.newsStore.setLastPage(nextPage);
          this.newsStore.setArticles(this.articles);
        });
      } else {
        this.endMsg = "No more articles to load, come back later.";
      }
    },
  },
};
</script>

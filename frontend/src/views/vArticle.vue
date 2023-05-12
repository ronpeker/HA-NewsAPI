<template>
  <div class="container-fluid">
    <div class="row justify-content-start">
      <button
        type="button"
        class="btn btn-outline-danger col-auto m-3"
        @click="goBack"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-square-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"
          ></path>
        </svg>
        Go Back
      </button>
    </div>
    <div class="row justify-content-center text-center">
      <h3>{{ article.title }}</h3>
    </div>
    <div class="row justify-content-end mb-1">
      <small class="col-auto publish-info"
        >{{ article.author }} -
        {{ new Date(article.publishedAt).toLocaleDateString("en-IL") }}</small
      >
    </div>
    <div class="row justify-content-center mb-3">
      <img
          :src="article.urlToImage"
          alt="article image"
          class="col-8"
        />
    </div>
    <div class="row justify-content-center text-center">
      <p class="description">{{ article.description }}</p>
    </div>
    <div class="row">
      <p class="content">{{ article.content }}</p>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useNewsStore } from "../stores/news";

export default {
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapStores(useNewsStore),
  },
  mounted() {
    this.article = this.newsStore.activeArticle;
  },
  methods: {
    goBack() {
      this.newsStore.setActiveArticle({});
      this.$router.push("/");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss" scoped>
.publish-info {
  font-size: 0.75em;
}
.description {
  font-size: 1em;
}
.content {
  font-size: 0.6em;
}
</style>

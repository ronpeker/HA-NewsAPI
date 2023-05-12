<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-8">
        <div class="card-body">
          <small class="card-text publish-date">{{
            new Date(article.publishedAt).toLocaleDateString("en-IL")
          }}</small>
          <h5 class="card-title" @click="openArticle">{{ article.title }}</h5>
          <p class="card-text description">
            {{
              article.description.length > 80
                ? article.description.slice(0, 80) + "..."
                : article.description
            }}
          </p>
        </div>
      </div>
      <div class="col-4">
        <img
          :src="article.urlToImage ? article.urlToImage : stockphoto"
          alt="article image"
          class="img-thumbnail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import stockphoto from "@/assets/stockphoto.jpg";
import { mapStores } from "pinia";
import { useNewsStore } from "../stores/news";

export default {
  props: ["article"],
  data() {
    return {
      stockphoto,
    };
  },
  computed: {
    ...mapStores(useNewsStore),
  },
  methods: {
    openArticle() {
      this.newsStore.setActiveArticle(this.article);
      this.$router.push("article");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
.publish-date {
  font-size: 0.5em;
}
.description {
  font-size: 0.75em;
}
.card-title:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>

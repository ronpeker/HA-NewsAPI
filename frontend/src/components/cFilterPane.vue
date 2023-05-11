<template>
  <form @submit.prevent="updateFilters">
    <div class="input-group input-group-sm">
      <span class="input-group-text">Keyword:</span>
      <input
        class="form-control"
        aria-label="Enter Keyword"
        type="text"
        v-model="keyword"
      />
    </div>
    <div class="row justify-content-center">
      <button
        v-for="category in categories"
        class="m-1 btn btn-sm col-auto"
        v-bind:class="{
          'btn-success': category == filtersStore.category,
          'btn-outline-secondary': category != chosenCategory,
          'btn-warning':
            category == chosenCategory && category != filtersStore.category,
        }"
        @click.prevent="chosenCategory = category"
      >
        {{ category }}
      </button>
    </div>
    <div class="row justify-content-center">
        <button type="submit" class="btn btn-primary col-auto">Apply Filters</button>
    </div>
  </form>
</template>

<script>
import { mapStores } from "pinia";
import { useFiltersStore } from "../stores/filters";

export default {
  data() {
    return {
      keyword: "",
      chosenCategory: "",
      categories: [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ],
    };
  },
  computed: {
    ...mapStores(useFiltersStore),
  },
  mounted() {
    this.chosenCategory = this.filtersStore.category;
    this.keyword = this.filtersStore.keyword;
  },
  methods: {
    updateFilters() {
      this.filtersStore.setKeyword(this.keyword);
      this.filtersStore.setCategory(this.chosenCategory);
    },
  },
};
</script>

<style lang="scss" scoped></style>

<script setup>
import { useFetch } from "@/composables/useFetch";
import ProductItem from "./ProductItem.vue";

const { data, error, loading, fetchData } = useFetch(
  "https://dummyjson.com/products"
);
</script>

<template>
  <div v-if="loading">Carregant...</div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
  <div class="product-list" v-else>
    <ProductItem
      v-for="p in data.products"
      :key="p.id"
      :title="p.title"
      :thumbnail="p.thumbnail"
      :price="p.price"
      :description="p.description"
    />
  </div>
</template>

<style scoped>
.error {
  color: red;
}
.product-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: stretch;
}
</style>

<script setup>
const props = defineProps({
  title: String,
  thumbnail: String,
  description: String,
  price: Number,
});
</script>

<template>
    <article>
        <img :src="thumbnail" :alt="title" />
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <p>{{ price }}€</p>
    </article>
</template>


<style scoped>
    .product-list {
        display: flex;
    }

</style>
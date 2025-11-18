<script setup>

    import {ref} from 'vue';
    import { RouterLink } from 'vue-router';
    
    const frameworks = ref([
    {
        id: 1,
        name: "Vue.js",
        desc: "Progressive Framework per construir interfícies web.",
    },
    {
        id: 2,
        name: "React",
        desc: "Biblioteca per crear interfícies d'usuari interactives.",
    },
    {
        id: 3,
        name: "Angular",
        desc: "Framework complet per aplicacions empresarials.",
    },
    ]);

</script>


<template>
    <h1>Frameworksss</h1>
    <ul>
      <li v-for="framework in frameworks" :key="framework.id">
          <RouterLink :to="`/frameworks/${framework.id}`">{{framework.name}}</RouterLink>
      </li>
    </ul>
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />

</template>

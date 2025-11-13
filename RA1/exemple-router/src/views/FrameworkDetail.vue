<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

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

    const route = useRoute();
    const id = route.params.id;
    const framework = frameworks.value.find((fr) => fr.id == id);


</script>

<template>
    <div>
        <p>{{ framework.name }}</p>
        <p>{{ framework.desc  }}</p>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
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

    const framework = ref(null); 

    const route = useRoute();
    const id = route.params.id;
    // const framework = frameworks.value.find((fr) => fr.id == id);

    
    //funció per vigilar el canvi de framework (id)
    const carregarFramework = (id) => {
        framework.value = frameworks.value.find((fr) => fr.id == id);
        console.log(typeof framework.value);
    };

    carregarFramework(id)

    watch( 
        () => route.params.id,
        (newId) => {
            carregarFramework(newId);
        }
    )
     
</script>

<template>
    <div>
        <p>{{ framework.name }}</p>
        <p>{{ framework.desc  }}</p>
    </div>
</template>

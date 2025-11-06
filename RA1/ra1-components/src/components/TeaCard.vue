

<script setup>
    const props = defineProps({
        nom: String
    });
    const emit = defineEmits(['sendName']);

    const sendName = () => {
      console.log('fill', props.nom)
      emit('sendName', props.nom);
    }
</script>


<template>
  <div @click="sendName" class="plan">
    <div class="description">
      <span class="title"> {{nom}} </span>
    </div>
  </div>
</template>

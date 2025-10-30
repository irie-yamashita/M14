<script setup>
import { ref } from 'vue';
import Reactivitat from './components/Reactivitat-REF.vue';
import VBinding from './components/VBinding.vue';
import VModel from './components/VModel.vue';
import VFor from './components/VFor.vue';
import VIf from './components/VIf.vue';
import VShow from './components/VShow.vue';
import VOn from './components/VOn.vue';
import VComputed from './components/VComputed.vue';


const num = ref(0);

</script>

<template>
  <!--<Reactivitat></Reactivitat>-->
  <!--<VBinding></VBinding>-->
  <VModel></VModel>
  <hr>
  <VFor></VFor>
  <hr>
  <VIf></VIf>
  <hr>
  <VShow></VShow>
  <hr>
  <VOn></VOn>
  <hr>
  <VComputed></VComputed>
</template>

<style scoped></style>

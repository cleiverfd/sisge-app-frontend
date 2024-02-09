<!-- FormularioDosPasos.vue -->
<template>
  <!-- Paso 1: Componente AddGeneral -->
  <AddGeneral v-if="currentStep === 1" @nextStep="nextStep" />

  <!-- Paso 2: Componente AddProcesal -->
  <AddProcesal v-if="currentStep === 2" @prevStep="prevStep" @nextStep="nextStep"/>

  <AddAsignacion v-if="currentStep === 3" @prevStep="prevStep" @nextStep="nextStep"/>

  <!-- Botones de navegación entre pasos -->
  <!-- Los botones de "Anterior" y "Siguiente" estarán en cada componente hijo -->
</template>
  
<script>
import { ref } from 'vue';
import AddGeneral from '../../components/proceeding/addGeneral.vue';
import AddProcesal from '../../components/proceeding/addProcesal.vue';
import AddAsignacion from '../../components/proceeding/addAsignacion.vue';

export default {
  components: {
    AddGeneral,
    AddProcesal,
    AddAsignacion
  },
  setup() {
    const currentStep = ref(1);

    const nextStep = () => {
      // Cambia al siguiente paso
      currentStep.value += 1;
    };

    const prevStep = () => {
      // Cambia al paso anterior
      currentStep.value -= 1;
    };

    return {
      currentStep,
      nextStep,
      prevStep,
    };
  },
};
</script>
  
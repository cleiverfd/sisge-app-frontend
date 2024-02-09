<template>
    <HomeAdmin />
  </template>
  
  <script setup>
  import HomeAdmin from '../home/HomeAdmin.vue';
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  // Usa un computed para rastrear el estado de autenticación
  const isLoggedIn = computed(() => store.state.user !== null);
  
  // Obtiene el usuario desde el estado del store
  const user = computed(() => store.state.user);
  
  onMounted(() => {
    console.log(user.value);
  });
  </script>
  
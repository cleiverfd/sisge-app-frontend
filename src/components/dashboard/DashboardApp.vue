<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
      <LayoutNabvar @toggle-sidebar="toggleSidebar" />
      <SidebarDesktop :show-sidebar="showSidebar" />
      <router-view />
    </div>
  </template>
  
  <script>
  import SidebarDesktop from '../layout/SidebarDesktop.vue';
  import LayoutNabvar from '../layout/LayoutNavbar.vue';
  
  export default {
    components: {
      LayoutNabvar,
      SidebarDesktop
    },
    data() {
      return {
        showSidebar: true
      };
    },
    methods: {
      toggleSidebar() {
        this.showSidebar = !this.showSidebar;
      },
      handleResize() {
        this.showSidebar = window.innerWidth > 760;
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize(); 
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
  };
  </script>
  
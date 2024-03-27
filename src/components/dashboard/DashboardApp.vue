<script setup>
import { RouterView } from 'vue-router'

import SidebarDesktop from '../layout/SidebarDesktop.vue';
import LayoutNabvar from '../layout/LayoutNavbar.vue';
</script>
<template>
    <div class="antialiased bg-gray-50 dark:bg-gray-900">
        <LayoutNabvar />
        <SidebarDesktop />
        <RouterView />
    </div>
</template>
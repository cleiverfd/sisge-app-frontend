<script setup>
import { RouterView } from 'vue-router'

import SidebarDesktop from '../layout/SidebarDesktop.vue';
import LayoutNabvar from '../layout/LayoutNavbar.vue';
</script>
<template>
    <main>
        <LayoutNabvar />
        <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
            <SidebarDesktop />
            <RouterView />
        </div>
    </main>
</template>
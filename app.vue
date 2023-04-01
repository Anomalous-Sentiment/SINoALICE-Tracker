<template>
  <div>
    <Menubar :model="items" />
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
    {
        label: 'Home',
        to: '/'
    },
    {
        label: 'Guilds',
        to: '/guilds'
    },

]);
</script>
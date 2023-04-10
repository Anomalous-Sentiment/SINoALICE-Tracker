<template>
  <div>
    <Menubar :model="items">
      <template #start>
    </template>
      <template #end>
        <Button label="Logout" @click="signOut" />
    </template>
    </Menubar>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { signOut } = useAuth()

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
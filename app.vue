<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";

const { isMobile } = useDevice();

const layout = ref('desktop')

if(isMobile)
{
  layout.value = 'mobile'
}
</script>
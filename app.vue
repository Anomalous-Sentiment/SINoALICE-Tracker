<template>
  <div 
  style="padding: 20px;
    text-align: center;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background: #273238;
    color:aliceblue;
    font-size: 20px;
    margin-bottom: 10px;
    ">
    <h1>SINoALICE Tracker</h1>
  </div>
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
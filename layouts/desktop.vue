
<template>
      <div 
        style="padding: 20px;
        text-align: center;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color:aliceblue;
        font-size: 20px;
        ">
    <h1>SINoALICE Tracker</h1>
    <DigitalClock/>
    <InlineMessage severity="warn">This is a work in-progress. There may be unexpected bugs and/or unreliable data</InlineMessage>
  </div>
    <div style="width: 80%; margin: 0 auto;">
        <Menubar :model="items">
        <template #start>
        </template>
        <template #end>
            <Button label="Logout" @click="signOut" />
        </template>
        </Menubar>
        <slot />
    </div>
</template>

<script setup>
import { ref } from "vue";
import DigitalClock from "../components/DigitalClock.vue";
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
    {
        label: 'GC Matchup Predictor',
        to: '/gc-matchups'
    },
]);
</script>
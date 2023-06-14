
<template>
    <div 
        style="padding: 15px;
        text-align: center;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color:aliceblue;
        font-size: 20px;
        ">
        <h1>SINoALICE Tracker</h1>
        <InlineMessage severity="warn">This is a work in-progress. There may be unexpected bugs and/or unreliable data</InlineMessage>
        <ClientOnly>
            <DigitalClock/>
        </ClientOnly>
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
    {
        label: 'Statistics',
        to: '/statistics'
    },
]);
</script>

<style scoped>
h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0;
    /* margin-block-end is same as margin-block-start (0.67em) by default. Only set to 0 here to make the warning message closer to the header*/ 
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
</style>

<template>
      <div 
        style="
        padding: 0;
        text-align: center;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color:aliceblue;
        font-size: 15px;
        "
    >
    <div class="header">
        <adsbygoogle v-if="useRuntimeConfig().public.enableAds" ad-slot="1760108843" :ad-style="{display: 'inline-block', width: '300px', height: '50px'}" :ad-format="null"/>
    </div>
    <h1>SINoALICE Tracker</h1>
    <div>
                <h2>
                    EoS Countdown
                </h2>
                <Countdown
                deadlineISO="2023-11-15T04:59:00Z"
                :flipAnimation="true"
                labelSize="1rem"
                labelColor="white"
                :labels="{days: 'Days',hours: 'Hrs',minutes: 'Mins',seconds: 'Secs',}"
                />
            </div>
  </div>
    <div style="width: 100%; margin: 0 auto;">
        <Menubar :model="items">
        <template #start>
        </template>
        <template #end>
            <Button v-if="useRuntimeConfig().public.enableAuth" label="Logout" @click="signOut" />
        </template>
        </Menubar>
        <slot />
    </div>
    <div class="footer">
        <adsbygoogle  v-if="useRuntimeConfig().public.enableAds" ad-slot="8161047422" :ad-style="{display: 'inline-block', width: '300px', height: '50px'}" :ad-format="null"/>
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
    {
        label: 'GC Matchup Predictor',
        to: '/gc-matchups'
    },
    {
        label: 'Statistics',
        to: '/statistics'
    },
    {
        label: 'Methodology',
        to: '/methodology'
    },
    {
        label: 'About',
        to: '/about'
    },
]);
</script>

<style scoped>
/* Get rid of margins on mobile because space is limited */
h1 {
    margin: 0;
}
.header {
    height: 50px;
    max-height: 50px !important;
    text-align: center;

}

.footer {
    height: 50px;
    max-height: 50px !important;
    text-align: center;

}
</style>
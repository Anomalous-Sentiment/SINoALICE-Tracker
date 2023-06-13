<template>
    <div>
        <ClientOnly>
            <apexchart type="area" :options="options" :series="series" ></apexchart>
        </ClientOnly>
    </div>
</template>

<script setup>
import { useActivityStore } from '@/stores/activityStore.js'
import { storeToRefs } from 'pinia'

const activityStore = useActivityStore()

const { playerActivity } = storeToRefs(activityStore)
const { populateActivityStore } = activityStore

const { pending } = useLazyAsyncData('activity', async() => {
    await populateActivityStore()
  })

const options = {
    title: {
        text: "SINoALICE Player Login Activity",
        align: "left"
    },
    subtitle: {
        text: "Player logins over time",
        align: "left"
    },
    xaxis: {
        type: 'datetime',
        title: {
            text: 'Snapshot Date',
            style: {
              fontSize: '16px',
            }
        }
    },
    stroke: {
        curve: 'straight'
    },
    tooltip: {
        theme: 'dark',
        x: {
            show: true,
            format: 'dd MMM yyyy',
            formatter: undefined,
        },
    },
    theme: {
        mode: 'dark'
    },
    dataLabels: {
        enabled: false
    },
    noData: {
        text: 'Getting Data...'
    },

    yaxis: {
        title: {
            text: 'No. of Players',
            style: {
              fontSize: '16px',
            }
        }
    },
}

const series = [
    {
        name: "Logged in within 1 day",
        data: playerActivity.value['day1Series']
    },
    {
        name: "Logged in within 3 daya",
        data: playerActivity.value['day3Series']
    },
    {
        name: "Logged in within 5 daya",
        data: playerActivity.value['day5Series']
    },
    {
        name: "Logged in within 7 daya",
        data: playerActivity.value['day7Series']
    },
    {
        name: "Logged in within 14 daya",
        data: playerActivity.value['day14Series']
    },
]
</script>
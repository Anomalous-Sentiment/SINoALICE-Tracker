<template>
    <ClientOnly>
        <Panel header="General Statistics and Data">
            <p>
                This page shows varous statistics about the game in a graph/chart format. Player login data is updated once daily, while GC data is updated once each GC concludes.
            </p>
            <p>
                Charts are interactive. Hovering over the data points on each chart will display a tooltip with more precise infomation. Clicking the legend of each chart will hide/show
                the associated data. 
            </p>
            <p>
                More statistics & charts may be added in future as seen fit.
            </p>
            <div class="flex-container">

                <div class="flex-element">
                    <apexchart width="100%" type="area" :options="playerActivityOptions" :series="playerSeries" ></apexchart>
                </div>
                <div class="flex-element">
                    <apexchart width="100%" type="area" :options="gcHistoryOptions" :series="gcHistorySeries" ></apexchart>
                </div>
            </div>
        </Panel>
    </ClientOnly>

</template>

<script setup>
import { useStatStore } from '@/stores/statStore.js'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

const statStore = useStatStore()

const { playerActivity, gcHistory } = storeToRefs(statStore)

const { populateStatStore } = statStore

const { pending } = useLazyAsyncData('stats', async() => {
    await populateStatStore()
  })
const nf = new Intl.NumberFormat();

const playerActivityOptions = {
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
        },
        labels: {
            formatter: function (value) {
                return nf.format(value);
            }
        },
    },
}

const playerSeries = computed(() => {
    const formattedSeries = [
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
    return formattedSeries
})


const gcHistorySeries = computed(() => {
    const formattedSeries = []

    for (const [key, value] of Object.entries(gcHistory.value))
    {

        const seriesObj = {
            name: `Top ${key}`,
            data: value
        }
        formattedSeries.push(seriesObj)
    }
    return formattedSeries
  })

const gcHistoryOptions = {
    title: {
        text: "SINoALICE Gran Colo LF Over Time",
        align: "left"
    },
    subtitle: {
        text: "Final LF at various ranks",
        align: "left"
    },
    tickAmount: 'datapoints',
    xaxis: {
        title: {
            text: 'GC No.',
            style: {
              fontSize: '16px',
            }
        },
        type: 'numeric',
        tickPlacement: 'on',
        labels: {
            formatter: function (value) {
                return nf.format(value);
            }
        },
    },
    stroke: {
        curve: 'straight'
    },
    tooltip: {
        theme: 'dark',
        x: {
          formatter: (gc_um) => `GC ${gc_um}`,
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
            text: 'Lifeforce',
            style: {
              fontSize: '16px',
            }
        },
        labels: {
            formatter: function (value) {
                return nf.format(value);
            }
        },
    }
}


</script>

<style scoped>
.flex-container{
    display: flex;
    flex-wrap: wrap
}

.flex-element{
    margin: 2px;
    flex-grow: 1;
    width: 50rem;
}

:deep(.apexcharts-menu-item.exportCSV) {
  display: none !important;
}
</style>
<template>
    <div class="flex-container">
        <div class="flex-element">
            <DataTable :value="guildData" :rows="15"
            scrollable
            :loading="loading"
        >

            <template #empty> No data found. </template>
            <template #loading> Loading guild data. Please wait. </template>
            <Column>
                <template #body="{ data, index }">
                    {{ data[0] }}
                </template>
            </Column>
            <Column>
                <template #body="{ data, index }">
                    <ClientOnly>
                        {{ data[0] === 'Ship HP' || data[0] === 'Total Estimated CP' || data[0] === 'Ranking' ? nf.format(data[1]) : data[1] }}
                    </ClientOnly>
                </template>
            </Column>
            </DataTable>
        </div>

        <div class="flex-element">
            <DataTable v-model:filters="filters" :value="gcHistory" paginator :rows="15" dataKey="gc_num" filterDisplay="row" sortField="gc_num" :sortOrder="-1"
            scrollable
            scroll-height="15rem"
            :loading="loading"
        >
            <template #empty> No GC data found. </template>
            <template #loading> Loading GC data. Please wait. </template>
            <Column field="gc_num" header="GC" sortable>
                <template #body="{ data, index }">
                    {{ nf.format(data['gc_num']) }}
                </template>
            </Column>
            <Column field="member_num" header="Members" sortable>
                <template #body="{ data }">
                    {{ nf.format(data['member_num']) }}
                </template>
            </Column>
            <Column field="timeslot" header="Timeslot">
                <template #body="{ data }">
                    {{ nf.format(data['timeslot']) }}
                </template>
            </Column>
            <Column field="lifeforce" header="Lifeforce" sortable>
                <template #body="{ data }">
                    {{ nf.format(data['lifeforce']) }}
                </template>
            </Column>
            <Column field="ranking" header="Overall Ranking" sortable>
                <template #body="{ data }">
                    {{ nf.format(data["ranking"]) }}
                </template>
            </Column>
            <Column field="ts_ranking" header="TS Ranking" sortable>
                <template #body="{ data }">
                    {{ nf.format(data["ts_ranking"]) }}
                </template>
            </Column>
            <Column field="wins" header="Wins" sortable>
                <template #body="{ data }">
                    {{ data["wins"] }}
                </template>
            </Column>
        </DataTable>
        </div>
    </div>
    <div>
        <DataTable v-model:filters="filters" :value="memberData" :rows="5" dataKey="guild_id" filterDisplay="row" sortField="ranking" :sortOrder="1"
            scrollable
            scroll-height="50vh"
            :loading="loading"
        >
            <template #empty> No Members found. </template>
            <template #loading> Loading member data. Please wait. </template>
            <Column field="icon_url" header="Icon">
                <template #body="{ data, index }">
                    <Image :src="data['icon_url']" width="50px" class="image-element"/>
                </template>
            </Column>
            <Column field="member" header="Name" :show-filter-menu="false">
                <template #body="{ data }">
                    {{ data['member'] }}
                </template>

            </Column>
            <Column field="level" header="Level">
                <template #body="{ data }">
                    {{ data['level'] }}
                </template>
            </Column>
            <Column field="estimated_cp" header="Estimated CP" sortable>
                <template #body="{ data }">
                    {{ nf.format(data['estimated_cp']) }}
                </template>
            </Column>
            <Column field="current_cp" header="Current CP" filterField="Timeslot" sortable>
                <template #body="{ data }">
                    {{ nf.format(data["current_cp"]) }}
                </template>
            </Column>
        </DataTable>
        </div>

  </template>

<script setup>
import { ref, computed } from 'vue'
import { FilterMatchMode } from 'primevue/api';
import { useguildSummaryStore } from '@/stores/guildSummaryStore.js'
import { storeToRefs } from 'pinia'

const guildDataStore = useguildSummaryStore()
const { populateSummaryStore } = guildDataStore
const { guildSummary }= storeToRefs(guildDataStore)


const nf = new Intl.NumberFormat();

const gcHistory = computed(() => {
    let gcData = []
    if (route.params.guild in guildSummary.value)
    {
        // Set gc history data if exists in store
        gcData = guildSummary.value[route.params.guild]['gcHistory']
    }

    return gcData

})

const memberData = computed(() => {
    let formattedData = []
    const testData = [
        {
            class_id: 100,
            member: 'NAme',
            level: 123,
            estimated_cp: 200000,
            current_cp: 100000
        },
        {
            class_id: 360,
            member: 'Guildy 2',
            level: 150,
            estimated_cp: 500000,
            current_cp: 300000
        }
    ]
    if (route.params.guild in guildSummary.value)
    {
        formattedData = guildSummary.value[route.params.guild]['members'].map(element => {
            const paddedId = element['class_id'].toString().padStart(3, '0')
            const url = `https://www.deachsword.com/db/sinoalice/en/images/ab/character/${element['class_id']}/${paddedId}.png`
            element['icon_url'] = url
            return element
        })
    }

    return formattedData
})

const guildData = computed(() => {
    const convertedData = []
    const testData2 = {
        guild: 'Ecstasy',
        gm: 'Pinky',
        ship_hp: 300000,
        overall_ranking: 1, 
        rank: 'S',
        timeslot: 13,
        description: 'Test Desc.',
        recruit_msg: 'Recruit msg.',
        estimated_cp: 1000000
    }

    // Check id guild data exists in store 
    if (route.params.guild in guildSummary.value)
    {
        // Load the data from store
        for (const [key, value] of Object.entries(guildSummary.value[route.params.guild]['summary'])) {
            convertedData.push([key, value])
        }
    }
    console.log(convertedData)

    return convertedData
})



const filters = ref({
    'member': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

const loading = false

const route = useRoute()
const { pending } = useLazyAsyncData('guild-summary', async() => {
    // Check if data not in store
    if (!(route.params.guild in guildSummary.value))
    {
        // Populate store with data if not in store
        await populateSummaryStore(parseInt(route.params.guild))
    }
  })

</script>

<style scoped>
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.2rem;
}
:deep(.p-datatable .p-datatable-thead > tr > th){
  padding: 1px;
}

:deep(.p-paginator) {
  padding: 0;
}

.flex-container{
    display: flex;
    flex-wrap: wrap
}

.flex-element{
    margin: 2px;
    flex-grow: 1;
    width: 50rem;
}

@media (max-width: 1000px) {
    .flex-container{
        display: flex;
        flex-wrap: wrap
    }

    .flex-element{
        margin: 2px;
        flex-grow: 1;
        width: 50%;
    }
}
</style>
<template>
    <div>
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
                {{ Number.isInteger(data[1]) ? nf.format(data[1]) : data[1] }}
            </template>
        </Column>
    </DataTable>
    </div>
    <div>
      <DataTable v-model:filters="filters" :value="memberData" paginator :rows="15" dataKey="guild_id" filterDisplay="row" sortField="ranking" :sortOrder="1"
        scrollable
        :loading="loading"
      >

        <template #empty> No Members found. </template>
        <template #loading> Loading member data. Please wait. </template>
        <Column header="#" sortable>
            <template #body="{ data, index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="class_id" header="Icon">
            <template #body="{ data, index }">
                <Image :src="data['class_id']" width="50px" class="image-element"/>
            </template>
        </Column>
        <Column field="member" header="Name" :show-filter-menu="false">
            <template #body="{ data }">
                {{ data['member'] }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name"/>
            </template>
        </Column>
        <Column field="level" header="Level">
            <template #body="{ data }">
                {{ data['level'] }}
            </template>
        </Column>
        <Column field="estimated_cp" header="Estimated CP" sortable>
            <template #body="{ data }">
                {{ data['estimated_cp'] }}
            </template>
        </Column>
        <Column field="current_cp" header="Current CP" filterField="Timeslot" sortable>
            <template #body="{ data }">
                {{ data["current_cp"] }}
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
            element['class_id'] = url
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
        console.log('hi')
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
        console.log(guildSummary)
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
</style>
<template>
    <div>
        <Dropdown v-model="selectedGc" :options="gcList" option-label="gvgeventid" option-value="gvgeventid" placeholder="Select GC" :loading="loadingGcList" @change="updateTable"/>

      <DataTable v-model:filters="filters" :value="displayMatchups" paginator :rows="100" dataKey="guild_id" filterDisplay="row"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        scrollable
        scroll-height="80vh"
        :loading="loading"
        sortField="total_lf" :sortOrder="-1"
        v-model:expandedRows="expandedRows"
      >
        <template #empty> No matchups found. </template>
        <template #loading> Loading matchup data. Please wait. </template>
        <Column expander style="width: 5rem" />
        <Column header="#" sortable>
            <template #body="{ data, index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="guild" header="Guild" :showFilterMenu="false" >
            <template #body="{ data }">
                {{ data['guild'] }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name"/>
            </template>
        </Column>
        <Column field="timeslot" header="TS" :showFilterMenu="false" >
            <template #body="{ data }">
                {{ data['timeslot'] }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="timeslotFilters"  placeholder="All" class="p-column-filter" :maxSelectedLabels="13">
                    <template #option="slotProps">
                        <div>
                            <span>{{ slotProps.option }}</span>
                        </div>
                    </template>
                </MultiSelect>
            </template>
        </Column>
        <Column field="day_1" header="Day 1">
            <template #body="{ data }">
                {{ data['day_1'] }}
            </template>
        </Column>
        <Column field="day_2" header="Day 2">
            <template #body="{ data }">
                {{ data['day_2'] }}
            </template>
        </Column>
        <Column field="day_3" header="Day 3">
            <template #body="{ data }">
                {{ data['day_3'] }}
            </template>
        </Column>
        <Column field="day_4" header="Day 4">
            <template #body="{ data }">
                {{ data['day_4'] }}
            </template>
        </Column>
        <Column field="day_5" header="Day 5">
            <template #body="{ data }">
                {{ data['day_5'] }}
            </template>
        </Column>
        <Column field="day_6" header="Day 6">
            <template #body="{ data }">
                {{ data['day_6'] }}
            </template>
        </Column>
        <Column field="total_lf" header="Total LF" sortable style="min-width: 8rem">
            <template #body="{ data }">
                {{ nf.format(data['total_lf']) }}
            </template>
        </Column>
        <template #expansion="slotProps">
                <div class="expand-row">
                    <h3>Daily GC data for {{ slotProps.data.guild }}</h3>
                    <DataTable :value="slotProps.data.daily_lf" data-key="day">
                        <Column field="day" header="Day" sortable>
                            <template #body="{ data }">
                                {{ nf.format(data['day']) }}
                            </template>
                        </Column>
                        <Column field="opponent" header="Opponent" sortable>
                            <template #body="{ data }">
                                {{ data['opponent'] }}
                            </template>
                        </Column>
                        <Column field="lf" header="LF" sortable>
                            <template #body="{ data }">
                                {{ nf.format(data['lf']) }}
                            </template>
                        </Column>
                        <Column field="lf_gain" header="LF Gain" sortable>
                            <template #body="{ data }">
                                {{ nf.format(data['lf_gain']) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
        </template>
      </DataTable>
    </div>
  </template>

<script setup>
import { ref, onMounted, onServerPrefetch, computed } from 'vue'
import { FilterMatchMode } from 'primevue/api';
import { useGcStore } from '@/stores/gcStore'
import { useTimeslotStore } from '@/stores/timeslotStore'
import { storeToRefs } from 'pinia'

const filters = ref({
  'guild': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'timeslot': { value: null, matchMode: FilterMatchMode.IN },
});
const expandedRows = ref([])

const selectedGc = ref()
const timeslotStore = useTimeslotStore()
const { timeslots } = storeToRefs(timeslotStore)
const { populateTimeslotStore } = timeslotStore

const gcStore = useGcStore()
const { gcMatchups, gcList } = storeToRefs(gcStore)
const { populateGcList, populateMatchupList } = gcStore

const nf = new Intl.NumberFormat();

// Get the matchups for the selected GC
const { pending: loading, data: count } = await useLazyAsyncData('gc_matchups', async() => {
    const matchupPromise = populateMatchupList(selectedGc.value)
    const timeslotPromise = populateTimeslotStore()
    await Promise.all([matchupPromise, timeslotPromise])
})

async function updateTable() {
    const matchupPromise = populateMatchupList(selectedGc.value)
    loading.value = true
    await matchupPromise
    loading.value = false
}

// Get the gc list
const {pending: loadingGcList} = await useLazyAsyncData('gc_list', populateGcList)



const timeslotFilters = computed(() => {
  const uniqueTimes = timeslots.value.map(item => item['timeslot'])
  return uniqueTimes
})


// Function to get the GC list from the JSON object for displaying
const displayMatchups = computed(() => {
    // Check if dropdown is undefined (First rendered)
    if (selectedGc.value != undefined)
    {
        //Get the array of matchups from the json object
        return gcMatchups.value[selectedGc.value]
    }
    else
    {
        return []
    }

})

</script>

<style scoped>
.expand-row {
    width: 80%;
    margin: auto;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
padding: 0.2rem;
}
:deep(.p-datatable .p-datatable-thead > tr > th){
padding: 1px;
}

:deep(.p-paginator) {
padding: 0;
}

:deep(.p-multiselect .p-multiselect-trigger) {
  width: 0px;
}
</style>
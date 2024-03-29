<template>
    <div>
        <Message severity="warn"><b>WARNING:</b> This is <b>NOT</b> a definitive list of matchups. <b>DO NOT</b> assume this table is correct. <b>If a predicted matchup is incorrect, then the "Opponent LF Gain" column WILL ALSO BE INCORRECT</b></Message>
        <Card>
            <template #title>
                GC Details
            </template>
            <template #content>
                <div class="info-card-container">
                    <div class="info-card-element">
                        <label for="gc-selector" class="p-component">Select a GC: </label>
                        <Dropdown v-model="selectedGc" :options="gcList" option-label="gvgeventid" placeholder="Select GC" :loading="loadingGcList" @change="updateTable" id="gc-selector"/>
                    </div>
                    <div class="infor-card-element">
                        <Divider layout="vertical"/>
                    </div>
                    <div class="info-card-element">
                        <div><b>Entry:</b> <u>{{ selectedGc ? df.format(selectedGc.entry_start) : 'N/A'}}</u> - <u>{{ selectedGc ? df.format(selectedGc.entry_end) : 'N/A' }}</u></div>
                        <div><b>Preliminaries:</b> <u>{{ selectedGc ? df.format(selectedGc.prelim_start) : 'N/A' }}</u> - <u>{{ selectedGc ? df.format(selectedGc.prelim_end) : 'N/A' }}</u></div>
                        <div><b>Last Updated:</b> <u>{{ selectedGc && selectedGc.last_updated ? df.format(selectedGc.last_updated) : 'N/A' }}</u> </div>
                    </div>
                </div>
            </template>
        </Card>
      <DataTable v-model:filters="filters" :value="displayMatchups" paginator :rows="100" dataKey="guild_id" filterDisplay="row"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        scrollable
        scroll-height="65vh"
        :loading="loading"
        sortField="total_lf" :sortOrder="-1"
        v-model:expandedRows="expandedRows"
      >
        <template #empty> No matchups found for selected GC. </template>
        <template #loading> Loading data. Please wait. </template>
        <Column expander style="width: 3rem" />
        <Column header="#" sortable>
            <template #body="{ data, index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="ranking" header="Rank" sortable>
            <template #body="{ data }">
                {{ nf.format(data['ranking']) }}
            </template>
        </Column>
        <Column field="guild" header="Guild" :showFilterMenu="false" >
            <template #body="{ data }">
                <NuxtLink :to="`/guild/${data['guild_id']}`">
                    {{ data['guild'] }}
                </NuxtLink>
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
        <Column field="day_1" header="Day 1?">
            <template #body="{ data }">
                <NuxtLink :to="`/guild/${data['opp_ids'][0]}`">
                    {{ data['day_1'] }}
                </NuxtLink>
            </template>
        </Column>
        <Column field="day_2" header="Day 2?">
            <template #body="{ data }">
                <NuxtLink :to="`/guild/${data['opp_ids'][1]}`">
                    {{ data['day_2'] }}
                </NuxtLink>
            </template>
        </Column>
        <Column field="day_3" header="Day 3?">
            <template #body="{ data }">
                <NuxtLink :to="`/guild/${data['opp_ids'][2]}`">
                    {{ data['day_3'] }}
                </NuxtLink>
            </template>
        </Column>
        <Column field="day_4" header="Day 4?">
            <template #body="{ data }">
                <NuxtLink :to="`/guild/${data['opp_ids'][3]}`">
                    {{ data['day_4'] }}
                </NuxtLink>
            </template>
        </Column>
        <Column field="day_5" header="Day 5?">
            <template #body="{ data }">
                <NuxtLink :to="`/guild/${data['opp_ids'][4]}`">
                    {{ data['day_5'] }}
                </NuxtLink>
            </template>
        </Column>
        <Column field="day_6" header="Day 6?">
            <template #body="{ data }">
                <NuxtLink :to="`/guild/${data['opp_ids'][5]}`">
                    {{ data['day_6'] }}
                </NuxtLink>
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
                        <Column field="opponent" header="Opponent?">
                            <template #body="{ data }">
                                {{ data['opponent'] }}
                            </template>
                        </Column>
                        <Column field="lf_gain" header="LF Gain (+ W/L bonus)" sortable>
                            <template #body="{ data }">
                                {{ nf.format(data['lf_gain']) }}
                            </template>
                        </Column>
                        <Column field="opp_lf" header="Opponent LF Gain (+ W/L bonus)" sortable>
                            <template #body="{ data }">
                                {{ nf.format(data['opp_lf']) }}
                            </template>
                        </Column>
                        <Column field="lf" header="Cumulative LF Sum" sortable>
                            <template #body="{ data }">
                                {{ nf.format(data['lf']) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
        </template>
      </DataTable>
    </div>
  </template>

<script setup>
import { ref, computed } from 'vue'
import { FilterMatchMode } from 'primevue/api';
import { useGcStore } from '@/stores/gcStore'
import { useTimeslotStore } from '@/stores/timeslotStore'
import { storeToRefs } from 'pinia'

const filters = ref({
  'guild': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'timeslot': { value: null, matchMode: FilterMatchMode.IN },
});
const expandedRows = ref([])
const loading = ref(false)
const selectedGc = ref()
const timeslotStore = useTimeslotStore()
const { gcTimeslots } = storeToRefs(timeslotStore)
const { populateTimeslotStore } = timeslotStore

const gcStore = useGcStore()
const { gcMatchups, gcList } = storeToRefs(gcStore)
const { populateGcList, populateMatchupList } = gcStore
import { useReCaptcha } from 'vue-recaptcha-v3';
const recaptchaInstance = useReCaptcha();

const localOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZoneName: "short",
};

const nf = new Intl.NumberFormat();
const df = new Intl.DateTimeFormat(undefined, localOptions)

const { pending } = useLazyAsyncData('timeslots', async() => {
    await populateTimeslotStore()
})

// Get the matchups for the selected GC
async function updateTable() {
    await recaptchaInstance?.recaptchaLoaded();

    // get the token, a custom action could be added as argument to the method
    const matchupsToken = await recaptchaInstance?.executeRecaptcha(`gc_${selectedGc.value.gvgeventid}_data`);
    const matchupPromise = populateMatchupList(selectedGc.value['gvgeventid'], matchupsToken)
    loading.value = true
    await matchupPromise
    loading.value = false
}

// Get the gc list
const {pending: loadingGcList} = useLazyAsyncData('gc_list', async() => {
    // Get the GC list
    await populateGcList();

    // Select the latest GC automatically
    if (gcList.value.length > 0)
    {
        selectedGc.value = gcList.value.reduce((prev, current) => {
            return prev['gvgeventid'] > current['gvgeventid'] ? prev : current
        })

        await updateTable()
    }

})



const timeslotFilters = computed(() => {
  const uniqueTimes = gcTimeslots.value.map(item => item['timeslot'])
  return uniqueTimes
})


// Function to get the GC list from the JSON object for displaying
const displayMatchups = computed(() => {
    // Check if dropdown is undefined (First rendered)
    if (selectedGc.value != undefined)
    {
        //Get the array of matchups from the json object
        return gcMatchups.value[selectedGc.value['gvgeventid']]
    }
    else
    {
        return []
    }

})

</script>

<style scoped>
.expand-row {
    width: 70%;
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
  width: 10px;
}
:deep(.p-message) {
    margin: 0rem;
}
/* CSS for NuxtLink styling. Only styling for <a> elements work for some reason */
/*
a {
    color: white;
    text-decoration: none;
    cursor: pointer;
}
*/

.info-card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.info-card-element {

}

</style>
<template>
    <div>
    <Message severity="info">All CP values are <NuxtLink to="/methodology#guild-cp-values">estimates only</NuxtLink>. For more accurate guild CP values, please see <NuxtLink to="https://docs.google.com/spreadsheets/d/1Ci0f9X1aZgNbTPt5-roKAixBO2jVXbrhqAcF_Vwfhxg/edit">this spreadsheet</NuxtLink> separately maintained by Catch with help from the community. To contribute to the spreadsheet, please message <em>re.catch</em> on Discord</Message>
      <DataTable v-model:filters="filters" :value="guilds" paginator :rows="100" dataKey="Guild_ID" filterDisplay="row" sortField="ranking" :sortOrder="1"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        scrollable
        scroll-height="67vh"
        :loading="loading"
      >

        <template #empty> No guilds found. </template>
        <template #loading> Loading guild data. Please wait. </template>
        <Column header="#" sortable>
            <template #body="{ data, index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="Overall_Rank" header="Rank" sortable>
            <template #body="{ data }">
                {{ data['Overall_Rank'] }}
            </template>
        </Column>
        <Column field="Guild" header="Guild Name"  :show-filter-menu="false">
            <template #body="{ data }">
                <NuxtLink :to="`/guild/${data['Guild_ID']}`">
                    {{ data['Guild'] }}
                </NuxtLink>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name"/>
            </template>
        </Column>
        <Column field="Guild_Master" header="Guild Master" :show-filter-menu="false" style="min-width: 8rem">
            <template #body="{ data }">
                {{ data['Guild_Master'] }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="Timeslot" header="TS" filterField="Timeslot" :showFilterMenu="false" >
            <template #body="{ data }">
                {{ data["Timeslot"] }}
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
        <Column field="Wins" header="W" sortable>
            <template #body="{ data }">
                {{ nf.format(data['Wins']) }}
            </template>
        </Column>
        <Column field="Losses" header="L" sortable>
            <template #body="{ data }">
                {{ nf.format(data['Losses']) }}
            </template>
        </Column>
        <Column field="Draws" header="D" sortable>
            <template #body="{ data }">
                {{ nf.format(data['Draws']) }}
            </template>
        </Column>
        <Column field="Members" header="Mem." sortable>
            <template #body="{ data }">
                {{ data['Members'] }}
            </template>
        </Column>
        <Column field="Total_HP" header="Total HP" sortable style="min-width: 8rem">
            <template #body="{ data }">
                {{ nf.format(data['Total_HP']) }}
            </template>
        </Column>
        <Column field="Average_Member_HP" header="Avg. HP" sortable style="min-width: 8rem">
            <template #body="{ data }">
                {{ nf.format(data['Average_Member_HP']) }}
            </template>
        </Column>
        <Column field="Median_Member_HP" header="Median HP" sortable style="min-width: 8rem">
            <template #body="{ data }">
                {{ nf.format(data['Median_Member_HP']) }}
            </template>
        </Column>
        <Column field="Total_Estimated_CP" header="Estimated CP" sortable style="min-width: 9rem">
            <template #body="{ data }">
                {{ nf.format(data['Total_Estimated_CP']) }}
            </template>
        </Column>
        <Column field="Average_Member_CP" header="Avg. CP" sortable style="min-width: 8rem">
            <template #body="{ data }">
                {{ nf.format(data['Average_Member_CP']) }}
            </template>
        </Column>
        <Column field="Median_Member_CP" header="Median CP" sortable style="min-width: 8rem">
            <template #body="{ data }">
                {{ nf.format(data['Median_Member_CP']) }}
            </template>
        </Column>
        <Column field="Last_Updated" header="Last Updated (GMT)" style="min-width: 13rem">
            <template #body="{ data }">
                {{ df.format(data['Last_Updated']) }}
            </template>
        </Column>
      </DataTable>
    </div>
  </template>
  

  <script setup>
  import { ref, onMounted, onServerPrefetch, computed } from 'vue'
  import { FilterMatchMode } from 'primevue/api';
  import { useGuildStore } from '@/stores/guildStore.js'
  import { useTimeslotStore } from '@/stores/timeslotStore'
  import { storeToRefs } from 'pinia'

const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "GMT",
    //timeZoneName: "short",
};

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Guild': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Guild_Master': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Timeslot': { value: null, matchMode: FilterMatchMode.IN },
  });
  

  const guildStore = useGuildStore()
  const timeslotStore = useTimeslotStore()
  const { timeslots } = storeToRefs(timeslotStore)
  const { guilds } = storeToRefs(guildStore)
  const { populateGuildStore } = guildStore
  const { populateTimeslotStore } = timeslotStore
  const nf = new Intl.NumberFormat();
  const df = new Intl.DateTimeFormat(undefined, options)

  const { pending: loading, data: count } = useLazyAsyncData('guilds', async() => {
    await populateGuildStore()    
  })

  const { pending } = useLazyAsyncData('timeslots', async() => {
    await populateTimeslotStore()    
  })

  const timeslotFilters = computed(() => {
    const uniqueTimes = timeslots.value.map(item => item['timeslot'])
    return uniqueTimes
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

:deep(.p-multiselect .p-multiselect-trigger) {
    width: 10px;
}

:deep(.p-message) {
    margin: 0rem;
}
/*
:deep(.p-message .p-message-wrapper) {
    padding: 0.5rem 1rem;
}
*/
</style>
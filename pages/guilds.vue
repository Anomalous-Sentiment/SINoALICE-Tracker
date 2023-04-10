<template>
    <div>
      <DataTable v-model:filters="filters" :value="guilds" paginator :rows="100" dataKey="Guild_ID" filterDisplay="row" sortField="ranking" :sortOrder="1"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <template #header>
          <div class="flex justify-content-end">
              <span class="p-input-icon-left">
                  <i class="pi pi-search"></i>
                  <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </span>
          </div>
        </template>
        <template #empty> No guilds found. </template>
        <template #loading> Loading guild data. Please wait. </template>
        <Column header="#" sortable>
            <template #body="{ data, index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="Overall_Rank" header="Overall Rank" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ data['Overall_Rank'] }}
            </template>
        </Column>
        <Column field="Guild" header="Guild Name" style="min-width: 12rem">
            <template #body="{ data }">
                {{ data['Guild'] }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="Guild_Master" header="Guild Master" style="min-width: 12rem">
            <template #body="{ data }">
                {{ data['Guild_Master'] }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="Timeslot" header="Time Slot" filterField="Timeslot" :showFilterMenu="false" :filterMenuStyle="{ width: '7rem' }">
            <template #body="{ data }">
                {{ data["Timeslot"] }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="timeslotFilters"  placeholder="All" class="p-column-filter" style="min-width: 7rem" :maxSelectedLabels="13">
                  <template #option="slotProps">
                      <div class="flex align-items-center gap-2">
                          <span>{{ slotProps.option }}</span>
                      </div>
                  </template>
              </MultiSelect>
                </template>
        </Column>
        <Column field="Wins" header="Wins" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ nf.format(data['Wins']) }}
            </template>
        </Column>
        <Column field="Losses" header="Losses" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ nf.format(data['Losses']) }}
            </template>
        </Column>
        <Column field="Draws" header="Draws" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ nf.format(data['Draws']) }}
            </template>
        </Column>
        <Column field="Members" header="Members" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ data['Members'] }}
            </template>
        </Column>
        <Column field="Total_Estimated_CP" header="Total Estimated CP" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ nf.format(data['Total_Estimated_CP']) }}
            </template>
        </Column>
        <Column field="Average_Member_CP" header="Average Estimated CP" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ nf.format(data['Average_Member_CP']) }}
            </template>
        </Column>
        <Column field="Median_Member_CP" header="Median Estimated CP" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ nf.format(data['Median_Member_CP']) }}
            </template>
        </Column>
      </DataTable>
    </div>
  </template>
  

  <script setup>
  import { ref, onMounted, onServerPrefetch, computed } from 'vue'
  import { FilterMatchMode } from 'primevue/api';
  import { useGuildStore } from '@/stores/guildStore.js'
  import { storeToRefs } from 'pinia'

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Guild': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Guild_Master': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Timeslot': { value: null, matchMode: FilterMatchMode.IN },
  });
  
  const guildStore = useGuildStore()
  const { guilds, timeslots } = storeToRefs(guildStore)
  const nf = new Intl.NumberFormat();

  const timeslotFilters = computed(() => {
    const uniqueTimes = timeslots.value.map(item => item['timeslot'])
    return uniqueTimes
  })
  </script>

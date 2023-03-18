<template>
    <div>
      <DataTable v-model:filters="filters" :value="guilds" paginator :rows="100" dataKey="guilddataid" filterDisplay="row" sortField="ranking" :sortOrder="1">
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
        <Column field="ranking" header="Overall Rank" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ data.ranking }}
            </template>
        </Column>
        <Column field="guildname" header="Name" style="min-width: 12rem">
            <template #body="{ data }">
                {{ data.guildname }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="guildmastername" header="Guild Master" style="min-width: 12rem">
            <template #body="{ data }">
                {{ data.guildmastername }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="gvgtimetype" header="Time Slot" filterField="gvgtimetype" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
            <template #body="{ data }">
                {{ data.gvgtimetype }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="timeslots"  placeholder="All" class="p-column-filter" style="min-width: 14rem" :maxSelectedLabels="13">
                  <template #option="slotProps">
                      <div class="flex align-items-center gap-2">
                          <span>{{ slotProps.option }}</span>
                      </div>
                  </template>
              </MultiSelect>
                </template>
        </Column>
        <Column field="guildpoint" header="Guild Points" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ data.guildpoint }}
            </template>
        </Column>
        <Column field="gvgwin" header="Wins" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ data.gvgwin }}
            </template>
        </Column>
        <Column field="gvglose" header="Losses" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ data.gvglose }}
            </template>
        </Column>
        <Column field="gvgdraw" header="Draws" sortable style="min-width: 12rem">
            <template #body="{ data }">
                {{ data.gvgdraw }}
            </template>
        </Column>
      </DataTable>
    </div>
  </template>
  

  <script setup>
  import { ref, onMounted, onServerPrefetch } from 'vue'
  import { FilterMatchMode } from 'primevue/api';
  
  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    guildname: { value: null, matchMode: FilterMatchMode.CONTAINS },
    guildmastername: { value: null, matchMode: FilterMatchMode.CONTAINS },
    gvgtimetype: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const { data:guilds } = await useAsyncData( 'guilds', async() => {
    if (process.server)
    {
      const nuxtApp = useNuxtApp()
      const prisma = nuxtApp.$prisma()
      const res =  await prisma.guilds.findMany()
      return res
    }
  });

  const timeslots = ref([])
  const uniqueTimes = [...new Set(guilds.value.map(item => item['gvgtimetype']))];
  timeslots.value = uniqueTimes
  /*
  timeslots.value = uniqueTimes.map((val, idx, arr) => {
    return {timeslot: val}
  })
*/
  /*
  // lifecycle hooks
  onMounted(() => {
    console.log(guilds)
  })
  */
  </script>

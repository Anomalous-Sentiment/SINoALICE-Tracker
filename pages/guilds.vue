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
  import { ref, onMounted, onServerPrefetch, computed } from 'vue'
  import { FilterMatchMode } from 'primevue/api';
  import { useGuildStore } from '@/stores/guildStore.js'
  import { storeToRefs } from 'pinia'

  const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    guildname: { value: null, matchMode: FilterMatchMode.CONTAINS },
    guildmastername: { value: null, matchMode: FilterMatchMode.CONTAINS },
    gvgtimetype: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  
  const guildStore = useGuildStore()
  const { populateGuilds } = guildStore
  const { guilds } = storeToRefs(guildStore)

//await useAsyncData('guilds', populateGuilds)
/*
  const {data:guilds} = await useAsyncData( 'guilds', async() => {
    const nuxtApp = useNuxtApp()
    let res = null
    let data = null

    res = await fetch('/api/guild-data')
    

    console.log(res.ok)

    if (res.ok == true)
    {
        console.log('enter')
        data = await res.arrayBuffer()
        console.log(data)
        const unpackedData = nuxtApp.$unpack(data)
        console.log(unpackedData)
        return unpackedData
    }
    else
    {
        console.log('server?')
        // Causing issues with updates?
        return []
    }
  });
*/
  const timeslots = computed(() => {
    if (guilds.value)
    {
        const uniqueTimes = [...new Set(guilds.value.map(item => item['gvgtimetype']))];
        return uniqueTimes
    }
    else
    {
        return []
    }

  })

  //clearNuxtData('guilds')

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

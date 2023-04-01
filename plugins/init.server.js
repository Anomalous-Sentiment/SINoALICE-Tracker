import { defineNuxtPlugin } from '#app'
import { useGuildStore } from '@/stores/guildStore.js'

export default defineNuxtPlugin(async (nuxtApp) => {
    console.log('serverinit plugin')
    //console.log('new')
    const guildStore = useGuildStore(nuxtApp.$pinia)

    await guildStore.populateGuilds()
})
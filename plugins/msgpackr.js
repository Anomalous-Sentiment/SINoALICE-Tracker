import { unpack } from 'msgpackr/unpack'
export default defineNuxtPlugin(() => {  
    return {
      provide: {
        unpack: (data) => {
            const converted = new Uint8Array(data)
            const unpackedData = unpack(converted)
            return unpackedData
        }
      }
    }
})
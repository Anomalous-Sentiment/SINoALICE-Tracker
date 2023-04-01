//import { unpack } from 'msgpackr/unpack'
import { unpack, pack } from 'msgpackr';
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
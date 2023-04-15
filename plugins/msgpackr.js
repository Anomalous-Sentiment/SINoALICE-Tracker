import { unpack } from 'msgpackr/unpack'
export default defineNuxtPlugin(() => {  
    return {
      provide: {
        unpack: (data) => {
          try {
            const converted = new Uint8Array(data)
            const unpackedData = unpack(converted)
            return unpackedData
          } catch (error) {
            console.log(error.message)
          }
        }
      }
    }
})
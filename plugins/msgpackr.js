import { unpack, Unpackr } from 'msgpackr/unpack'
export default defineNuxtPlugin(() => {  
    return {
      provide: {
        unpack: (data) => {
          try {
            const converted = new Uint8Array(data)
            const unpackr = new Unpackr({ mapsAsObjects: true, variableMapSize: true });
            // const unpackedData = unpack(converted)
            const unpackedData = unpackr.decode(converted)

            return unpackedData
          } catch (error) {
            console.log(error.message)
          }
        }
      }
    }
})
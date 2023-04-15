import { Unpackr } from 'msgpackr/unpack'
export default defineNuxtPlugin(() => {  
    return {
      provide: {
        unpack: (data) => {
          const converted = new Uint8Array(data)
          const unpackr = new Unpackr({ mapsAsObjects: true, variableMapSize: true });
          const unpackedData = unpackr.decode(converted)

          return unpackedData

        }
      }
    }
})
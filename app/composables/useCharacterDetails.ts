import type { Ref } from 'vue'
import { createRickMortyService } from '~/services/rick-morty'

export function useCharacterDetails(id: Ref<number>) {
  const service = createRickMortyService(useApi())

  return useAsyncData(
    () => `character:${id.value}`,
    (_, { signal }) => service.getCharacterDetails(id.value, signal),
  )
}

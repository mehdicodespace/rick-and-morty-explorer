import type { Ref } from 'vue'
import { createRickMortyService } from '~/services/rick-morty'

export function useCharacters(page: Ref<number>, name: Ref<string>, pageSize: number) {
  const service = createRickMortyService(useApi())
  return useAsyncData(
    () => `characters-${page.value}-${name.value}`,
    (_, { signal }) => service.getCharacters(page.value, name.value, pageSize, signal),
    { dedupe: 'cancel' },
  )
}

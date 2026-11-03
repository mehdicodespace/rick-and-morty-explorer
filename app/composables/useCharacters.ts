import type { Ref } from 'vue'
import { createRickMortyService } from '~/services/rick-morty'
import { useCharactersStore } from '~/stores/characters'

export function useCharacters(page: Ref<number>, name: Ref<string>, pageSize: number) {
  const store = useCharactersStore()
  const service = createRickMortyService(useApi(), store)
  return useAsyncData(
    () => `characters-${page.value}-${name.value}`,
    (_, { signal }) => service.getCharacters(page.value, name.value, pageSize, signal),
    { dedupe: 'cancel' },
  )
}

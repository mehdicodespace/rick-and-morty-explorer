import type {
  Character,
  ApiCharacterPage,
  CharacterDetails,
  CharacterLocation,
  CharacterPage,
  Episode,
} from '../../shared/types/rick-morty'

const API_PAGE_SIZE = 20

function getIdsFromUrls(urls: string[]): number[] {
  const ids: number[] = []
  for (const url of urls) {
    const match = url.match(/\/(?:episode|location)\/(\d+)\/?$/)
    if (match) {
      const id = Number(match[1])
      if (!ids.includes(id)) ids.push(id)
    }
  }
  return ids
}

async function getEpisodes(
  api: typeof $fetch,
  ids: number[],
  signal?: AbortSignal,
): Promise<Episode[]> {
  if (!ids.length) return []
  const data = await api<Episode | Episode[]>(`/episode/${ids.join(',')}`, { signal })
  return Array.isArray(data) ? data : [data]
}

async function getLocations(
  api: typeof $fetch,
  ids: number[],
  signal?: AbortSignal,
): Promise<CharacterLocation[]> {
  if (!ids.length) return []
  const data = await api<CharacterLocation | CharacterLocation[]>(`/location/${ids.join(',')}`, {
    signal,
  })
  return Array.isArray(data) ? data : [data]
}

export function createRickMortyService(api: typeof $fetch) {
  return {
    async getCharacters(
      page: number,
      name: string,
      pageSize: number,
      signal?: AbortSignal,
    ): Promise<CharacterPage> {
      if (!Number.isInteger(pageSize) || pageSize < 1) {
        throw new Error('pageSize must be a positive integer')
      }

      const offset = (page - 1) * pageSize
      const upstreamPage = Math.floor(offset / API_PAGE_SIZE) + 1
      const start = offset % API_PAGE_SIZE

      const loadPage = async (p: number): Promise<ApiCharacterPage> => {
        const data = await api<ApiCharacterPage>('/character', {
          query: { page: p, name: name || undefined },
          signal,
        })
        return data
      }

      const firstPage = await loadPage(upstreamPage)
      const results = firstPage.results.slice(start, start + pageSize)
      let hasMore = Boolean(firstPage.info.next)
      let nextPageNum = upstreamPage + 1

      while (results.length < pageSize && hasMore) {
        const next = await loadPage(nextPageNum++)
        results.push(...next.results.slice(0, pageSize - results.length))
        hasMore = Boolean(next.info.next)
      }

      return {
        info: {
          count: firstPage.info.count,
          pages: Math.ceil(firstPage.info.count / pageSize),
        },
        results,
      }
    },

    async getCharacterDetails(id: number, signal?: AbortSignal): Promise<CharacterDetails> {
      const character = await api<Character>(`/character/${id}`, { signal })

      const episodeIds = getIdsFromUrls(character.episode)
      const locationIds = getIdsFromUrls([character.origin.url, character.location.url])

      const [episodes, locations] = await Promise.all([
        getEpisodes(api, episodeIds, signal),
        getLocations(api, locationIds, signal),
      ])

      return { character, episodes, locations }
    },
  }
}

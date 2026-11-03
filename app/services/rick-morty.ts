import type {
  ApiCharacterPage,
  CharacterPage,
} from '../../shared/types/rick-morty'

const API_PAGE_SIZE = 20

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

  }
}

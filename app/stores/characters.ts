import { defineStore } from 'pinia'
import type { ApiCharacterPage } from '../../shared/types/rick-morty'

type CacheEntry = {
  page: number
  name: string
  response: ApiCharacterPage
  expiresAt: number
}

const CACHE_TTL = 5 * 60 * 1000
const CACHE_LIMIT = 20

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    pages: [] as CacheEntry[],
  }),
  actions: {
    getPage(page: number, name: string) {
      const entry = this.pages.find((e) => e.page === page && e.name === name)
      if (!entry || entry.expiresAt < Date.now()) return undefined
      return entry.response
    },
    savePage(page: number, name: string, response: ApiCharacterPage) {
      const existing = this.pages.findIndex((e) => e.page === page && e.name === name)
      if (existing !== -1) this.pages.splice(existing, 1)
      this.pages.push({ page, name, response, expiresAt: Date.now() + CACHE_TTL })
      if (this.pages.length > CACHE_LIMIT) this.pages.shift()
    },
  },
})

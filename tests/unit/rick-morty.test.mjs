import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createPinia, setActivePinia } from 'pinia'
import { createRickMortyService } from '../../app/services/rick-morty.ts'
import { useCharactersStore } from '../../app/stores/characters.ts'

test('splits API pages into smaller UI pages', async () => {
  const api = async () => ({
    info: { count: 7, pages: 1, next: null, prev: null },
    results: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }],
  })
  setActivePinia(createPinia())
  const service = createRickMortyService(api, useCharactersStore())

  const page1 = await service.getCharacters(1, '', 3)
  const page3 = await service.getCharacters(3, '', 3)

  assert.equal(page1.results.length, 3)
  assert.deepEqual(page3.results, [{ id: 7 }])
})

test('fetches character episodes and locations in as few requests as possible', async () => {
  const base = 'https://rickandmortyapi.com/api'
  const requests = []
  const api = async (path) => {
    requests.push(path)
    if (path === '/character/1')
      return {
        episode: [`${base}/episode/1`, `${base}/episode/2`],
        origin: { url: `${base}/location/3` },
        location: { url: `${base}/location/3` }, // same as origin, should only fetch once
      }
    if (path === '/episode/1,2') return [{ id: 1 }, { id: 2 }]
    if (path === '/location/3') return { id: 3 }
  }
  const result = await createRickMortyService(api).getCharacterDetails(1)
  assert.equal(result.episodes.length, 2)
  assert.equal(result.locations.length, 1)
  assert.deepEqual(requests, ['/character/1', '/episode/1,2', '/location/3'])
})

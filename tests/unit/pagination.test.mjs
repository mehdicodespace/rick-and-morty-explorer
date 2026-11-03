import assert from 'node:assert/strict'
import { test } from 'node:test'
import { paginationItems, parsePage } from '../../shared/utils/pagination.ts'

test('parsePage', () => {
  assert.equal(parsePage('5'), 5)
  assert.equal(parsePage('0'), 1)
  assert.equal(parsePage(undefined), 1)
  assert.equal(parsePage('abc'), 1)
})

test('paginationItems', () => {
  assert.deepEqual(paginationItems(2, 5), [1, 2, 3, 4, 5])
  assert.ok(paginationItems(10, 20).includes('ellipsis'))
  assert.ok(paginationItems(10, 20).includes(10))
})

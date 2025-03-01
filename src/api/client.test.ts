import { describe, expect, test } from 'vitest'
import { getApiClient } from './client'

describe('client', () => {
  test('getUser', async () => {
    const user = await getApiClient('https://jsonplaceholder.typicode.com').get(
      '/users/:id',
      { params: { id: 7 } }
    )

    expect(user).toMatchObject({ id: 7, name: 'Kurtis Weissnat' })
  })
})

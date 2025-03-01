import { describe, expect, test } from 'vitest'
import { apiClient } from './client'

describe('client', () => {
  test('getUser', async () => {
    const user = await apiClient.get('/users/:id', { params: { id: 7 } })

    expect(user).toMatchObject({ id: 7, name: 'Kurtis Weissnat' })
  })
})

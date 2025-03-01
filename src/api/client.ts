import { Zodios } from '@zodios/core'
import { z } from 'zod'

export const apiClient = new Zodios(
  'https://jsonplaceholder.typicode.com',
  // API definition
  [
    {
      method: 'get',
      path: '/users/:id', // auto detect :id and ask for it in apiClient get params
      alias: 'getUser', // optional alias to call this endpoint with it
      description: 'Get a user',
      response: z.object({
        id: z.number(),
        name: z.string()
      })
    }
  ]
)

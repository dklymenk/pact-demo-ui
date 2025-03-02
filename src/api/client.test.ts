import { describe, expect, it } from 'vitest'
import { getApiClient } from './client'
import path from 'node:path'
import process from 'node:process'
import { MatchersV3, PactV4, SpecificationVersion } from '@pact-foundation/pact'

const pact = new PactV4({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'pact-demo-ui',
  provider: 'pact-demo-be',
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4 // Modify this as needed for your use case
})

const userExample = {
  id: 7,
  name: 'Kurtis Weissnat',
  nationality: 'US',
  lastName: 'Smith'
}
const EXPECTED_BODY = MatchersV3.like(userExample)

describe('client', () => {
  describe('getUser', () => {
    it('returns an HTTP 200 and a user', async () => {
      await pact
        .addInteraction()
        .given('a user with ID 7 exists')
        .uponReceiving('a request for user with ID 7')
        .withRequest('GET', '/users/7')
        .willRespondWith(200, (builder) => {
          builder.headers({ 'Content-Type': 'application/json' })
          builder.jsonBody(EXPECTED_BODY)
        })
        .executeTest(async (mockServer) => {
          const user = await getApiClient(mockServer.url).get('/users/:id', {
            params: { id: 7 }
          })

          expect(user).toMatchObject({
            id: 7,
            name: 'Kurtis Weissnat',
            lastName: 'Smith',
            nationality: 'US'
          })
        })
    })
  })
})

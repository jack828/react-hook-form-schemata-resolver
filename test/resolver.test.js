import assert from 'assert'
import resolver from '../'
import schemata from 'schemata'
import required from 'validity-required'

const createSchema = () =>
  schemata({
    name: 'User',
    properties: {
      name: {
        type: String,
        validators: [required]
      },
      age: {
        type: Number
      },
      createdDate: {
        type: Date,
        defaultValue: () => new Date('2000-01-01T00:00:00.000Z')
      }
    }
  })

describe('Resolver', () => {
  it('should resolve with errors with empty data', async () => {
    const data = {}
    const resolve = resolver(createSchema())
    const output = await resolve(data, {}, {})
    const expectedErrors = {
      name: {
        message: 'Name is required',
        ref: undefined
      }
    }
    const expectedValues = {
      name: null,
      age: null,
      createdDate: new Date('2000-01-01T00:00:00.000Z')
    }
    assert.deepStrictEqual(output.errors, expectedErrors)
    assert.deepStrictEqual(output.values, expectedValues)
  })

  it('should resolve without errors with valid data', async () => {
    const data = { name: 'Jack Burgess', age: 24 }
    const resolve = resolver(createSchema())
    const output = await resolve(data, {}, {})
    const expectedErrors = {}
    const expectedValues = {
      name: 'Jack Burgess',
      age: 24,
      createdDate: new Date('2000-01-01T00:00:00.000Z')
    }
    assert.deepStrictEqual(output.errors, expectedErrors)
    assert.deepStrictEqual(output.values, expectedValues)
  })
})

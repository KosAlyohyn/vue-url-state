import { describe, expect, it } from 'vitest'
import { useUrlState } from '../src/index.js'
import { createHarness, flushRouter } from './test-utils.js'

describe('aliases', () => {
  it('reads aliases only when the primary key is absent', async () => {
    const first = await createHarness('/?tags=one&tags=two')
    const state = first.run(() => useUrlState({
      tags: {
        type: 'array',
        key: 'tags[]',
        aliases: ['tags'],
        defaultValue: [],
      },
    }))

    expect(state.tags.value).toEqual(['one', 'two'])

    const second = await createHarness('/?tags[]=primary&tags=alias')
    const secondState = second.run(() => useUrlState({
      tags: {
        type: 'array',
        key: 'tags[]',
        aliases: ['tags'],
        defaultValue: [],
      },
    }))

    expect(secondState.tags.value).toEqual(['primary'])
  })

  it('writes only the primary key and removes stale aliases', async () => {
    const { router, run } = await createHarness('/?tags=old&external=value')
    const state = run(() => useUrlState({
      tags: {
        type: 'array',
        key: 'tags[]',
        aliases: ['tags'],
        defaultValue: [],
      },
    }))

    state.tags.value = ['new']
    await flushRouter()

    expect(router.currentRoute.value.query).toEqual({
      external: 'value',
      'tags[]': ['new'],
    })
  })
})

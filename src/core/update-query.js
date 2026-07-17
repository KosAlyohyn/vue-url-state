import { queryEquals } from '../helpers/equality.js'
import { cloneQuery, deleteFieldKeys } from '../helpers/query.js'
import { serializeFieldValue } from './create-field.js'

export function createQueryUpdater(route, router, fields, options = {}) {
  const history = options.history ?? 'replace'

  if (history !== 'replace' && history !== 'push') {
    throw new Error(`Unsupported history mode: ${history}`)
  }

  return async function updateQuery(values) {
    const query = cloneQuery(route.query)

    for (const [name, value] of Object.entries(values)) {
      if (value === undefined) {
        continue
      }

      const field = fields[name]

      if (!field) {
        throw new Error(`Unknown URL state field: ${name}`)
      }

      deleteFieldKeys(query, field)

      const serialized = serializeFieldValue(field, value)

      if (serialized != null) {
        query[field.key] = serialized
      }
    }

    if (queryEquals(route.query, query)) {
      return undefined
    }

    return router[history]({
      query,
    })
  }
}

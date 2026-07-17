import { createField } from '../core/create-field.js'
import { createQueryUpdater } from '../core/update-query.js'
import { useRouterContext } from '../helpers/router.js'
import { normalizeSchema } from '../helpers/schema.js'

export function useUrlParam(name, options = {}) {
  const { route, router } = useRouterContext()

  const fields = normalizeSchema({ [name]: options })
  const updateQuery = createQueryUpdater(route, router, fields, {
    history: options.history,
  })

  return createField(route, updateQuery, fields[name])
}

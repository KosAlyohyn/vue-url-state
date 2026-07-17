import { arrayQueryValue } from '../helpers/query.js'

export function parseArray(raw, field) {
  const values = arrayQueryValue(raw)

  if (!values.length) {
    return field.defaultValue
  }

  const result = values.map((value) => String(value))

  if (field.allowedValues && result.some((value) => !field.allowedValues.includes(value))) {
    return field.defaultValue
  }

  return result
}

export function serializeArray(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return null
  }

  return value.map((item) => String(item))
}

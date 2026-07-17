import { firstQueryValue } from '../helpers/query.js'

export function parseBoolean(raw, field) {
  const value = firstQueryValue(raw)

  if (value == null) {
    return field.defaultValue
  }

  if (value === '1' || value === 'true') {
    return true
  }

  if (value === '0' || value === 'false') {
    return false
  }

  return field.defaultValue
}

export function serializeBoolean(value) {
  return value ? '1' : '0'
}

import { firstQueryValue } from '../helpers/query.js'

export function parseString(raw, field) {
  const value = firstQueryValue(raw)

  if (value == null) {
    return field.defaultValue
  }

  if (field.allowedValues && !field.allowedValues.includes(value)) {
    return field.defaultValue
  }

  return value
}

export function serializeString(value) {
  return String(value)
}

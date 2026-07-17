import { firstQueryValue } from '../helpers/query.js'

export function parseNumber(raw, field) {
  const value = firstQueryValue(raw)

  if (value == null || value === '') {
    return field.defaultValue
  }

  const number = Number(value)

  if (!Number.isFinite(number)) {
    return field.defaultValue
  }

  if (field.positive && number <= 0) {
    return field.defaultValue
  }

  if (field.allowedValues && !field.allowedValues.includes(number)) {
    return field.defaultValue
  }

  return number
}

export function serializeNumber(value) {
  const number = Number(value)

  if (!Number.isFinite(number)) {
    return null
  }

  return String(number)
}

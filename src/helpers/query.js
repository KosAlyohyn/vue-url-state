export function firstQueryValue(value) {
  if (Array.isArray(value)) {
    return value[0] ?? null
  }

  return value ?? null
}

export function arrayQueryValue(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => item != null)
  }

  if (value == null) {
    return []
  }

  return [value]
}

export function cloneQuery(query) {
  const next = {}

  for (const [key, value] of Object.entries(query)) {
    next[key] = Array.isArray(value) ? [...value] : value
  }

  return next
}

export function deleteFieldKeys(query, field) {
  delete query[field.key]

  for (const alias of field.aliases) {
    delete query[alias]
  }
}

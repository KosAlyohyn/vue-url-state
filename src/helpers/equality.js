function normalizeValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item))
  }

  if (value == null) {
    return undefined
  }

  return String(value)
}

export function queryEquals(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])

  for (const key of keys) {
    const left = normalizeValue(a[key])
    const right = normalizeValue(b[key])

    if (Array.isArray(left) || Array.isArray(right)) {
      if (!Array.isArray(left) || !Array.isArray(right)) {
        return false
      }

      if (left.length !== right.length) {
        return false
      }

      for (let index = 0; index < left.length; index += 1) {
        if (left[index] !== right[index]) {
          return false
        }
      }

      continue
    }

    if (left !== right) {
      return false
    }
  }

  return true
}

export function valueEquals(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) {
    return Array.isArray(a)
      && Array.isArray(b)
      && a.length === b.length
      && a.every((item, index) => item === b[index])
  }

  return a === b
}

export function normalizeSchema(schema) {
  const fields = {}

  for (const [name, options] of Object.entries(schema)) {
    fields[name] = {
      ...options,
      name,
      key: options.key ?? name,
      aliases: options.aliases ?? [],
      omitDefault: options.omitDefault ?? true,
    }
  }

  return fields
}

export function assertKnownFields(fields, values) {
  for (const name of Object.keys(values)) {
    if (!fields[name]) {
      throw new Error(`Unknown URL state field: ${name}`)
    }
  }
}

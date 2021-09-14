import { toNestError, validateFieldsNatively } from '@hookform/resolvers'

const parseErrors = (errors, parsedErrors = {}, path = '') =>
  Object.keys(errors).reduce((acc, key) => {
    const errorPath = path ? `${path}.${key}` : key
    const error = errors[key]

    if (typeof error === 'string') {
      acc[errorPath] = {
        message: error
      }
    } else {
      parseErrors(error, acc, errorPath)
    }

    return acc
  }, parsedErrors)

const schemataResolver = (schema, schemaOptions = {}) => (
  object,
  context,
  options
) =>
  new Promise((resolve, reject) => {
    const { set, tag, persist, ignoreTagForSubSchema } = schemaOptions
    const cleanObject = schema.cast(
      schema.stripUnknownProperties(
        schema.makeDefault(object),
        persist || tag,
        ignoreTagForSubSchema
      )
    )
    schema.validate(cleanObject, set, tag, (error, validationErrors) => {
      if (error) return reject(error)

      if (validationErrors && Object.keys(validationErrors).length) {
        return resolve({
          values: cleanObject,
          errors: toNestError(parseErrors(validationErrors), options)
        })
      }

      options.shouldUseNativeValidation && validateFieldsNatively({}, options)
      resolve({ values: cleanObject, errors: {} })
    })
  })

export default schemataResolver

# react-hook-form-schemata-resolver

Custom resolver to use [Schemata](https://github.com/serby/schemata) with [react-hook-form](https://github.com/react-hook-form/react-hook-form).

## Installation

```
$ npm install react-hook-form-schemata-resolver
$ yarn add react-hook-form-schemata-resolver
```

## API

`resolver(schema: object, schemaOptions?: object, resolverOptions: { mode: 'async' | 'sync' })`

| Parameter       | Type     | Required | Description                        |
| --------------- | -------- | -------- | ---------------------------------- |
| schema          | `object` | ✓        | validation schema                  |
| schemaOptions   | `object` |          | validation library schema options  |
| resolverOptions | `object` |          | resolver options                   |

`schemaOptions` can be an object accepting the following values:

 - set
 - tag
 - persist
 - ignoreTagForSubSchema

Please refer to schemata for documentation about these options.

## Usage

### [Schemata](https://github.com/serby/schemata)

Define, create, and validate your business objects based on specified schema.

[![npm](https://img.shields.io/bundlephobia/minzip/schemata?style=for-the-badge)](https://bundlephobia.com/result?p=schemata)

```jsx
import { useForm } from 'react-hook-form'
import schemataResolver from 'react-hook-form-schemata-resolver'
import schemata from 'schemata'
// Schemata leverages `validity` for validator packages
import required from 'validity-required'

const createSchema = () =>
  schemata({
    name: 'User',
    properties: {
      name: {
        type: String,
        validators: [required]
      },
      age: {
        type: Number
      },
      createdDate: {
        type: Date,
        defaultValue: () => new Date()
      }
    }
  })

const App = () => {
  const {
    register,
    handleSubmit
  } = useForm({
    resolver: schemataResolver(createSchema())
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('name')} />
      <input type="number" {...register('age')} />
      <input type="submit" />
    </form>
  )
}
```

## Author

[Jack Burgess](https://github.com/jack828) check out [my website](https://jackburgess.dev)!

## Licence

Licensed under [GNU GPLv3](https://opensource.org/licenses/GPL-3.0).

# Technical Documentation

## Normalization process

The normalization process will use **Nest interceptor**, we will also use `Reflector` provided by Nest to hook cleanly.
Also, the process should be able to manage errors as it. Error of ORMs will be managed by the package itself to return clean error messages.

Normalization process has to return APIs calls responses as following:

```json
"message":"",
"data": {},
"statusCode": 200,
```

This format can be changed by a `global rule` which is applied on bootstraping.

## `MessageInterpretor`

This component will be responsible of casting `parameters` into real values.
This process will start when all API call invokation informations are collected by the interceptor.

## `message` field

This field will be automatically builded by the module, the message autobuilding process will be based on some factors:
  - Getting invoked `Nest Module` name and make it plural or singular depending on the `data` returned by the `invoked method` (if it's a table, then make it plural, otherwise singular).
  - The `Nest Module Name` will result in a `:apiCallSubject` parameter, this parameter will be used in `MessageInterpretor`.

### `:apiCallSubject` parameter

This parameter will be replaced by the 'Normalized' Nest module name.
It could be overwritten by a `Nest metadata decorator` to replace the auto-determined `:apiCallSubject` value by a choosen one.

### `:apiCallQueryParams` parameter

This parameter will be replaced by the 'Normalized' lists of query parameters with which the API call was made.
It could be removed by using a `Nest metadata decorator` on controller methods declarations.

#### Personalization

This parameter format should be personnalizable using a global or local rule.

## Rules

- `apiCallQueryParamsFormat`: It's global but it also can be overwritten by local declaration
  - `syntax`: This can take `:name` and `:value` interpretor parameters.
  - `separator`: This will be used to separate each `syntax` (If there's more than one query params)
- `formatting`: This can take following parameters:
  - `[anyInterpretorParameter]`: 
    - `upper`: This will upper interpreted value.
    - `normal`: This will normalize (if `:apiCallSubject` = `usersModule` then will produce `Users`) interpreted value.
    - `lower`: This will lower interpreted value.
    - `unchanged`: This will do nothing (it's the default behavior).
    - `replaceValueBy`: [`oldValue`, `newValue`]; This will replace interpreted `oldValue` by `newValue`.
- `message`: It's global but it also can be overwritten by local declaration
  - `[anyHTTPRequest]`:
    - `success`: `message to return` (Could use interpretor parameters in there)
    - `error`: `message to return` (Could use interpretor parameters in there)

### Examples

- `formatting` Rule:

  ```json
  "formatting": {
    ":apiCallSubject": "normal",
    ":apiCallQueryParamName": {
      "replaceValueBy": ["uuid", "UUID"]
    },
  }
  ```

- `apiCallQueryParamsFormat` Rule:

  ```json
  "apiCallQueryParamsFormat": {
    "syntax": "':name':':value'",
    "separator": ", ",
  }
  ```

- `message` Rule:

  ```json
  "message": {
    "post": {
      "success": ":apiCallSubject has been created for :apiCallQueryParams",
      "error": ":apiCallSubject cannot be created for :apiCallQueryParams"
    }
  }
  ```

## Metadata Decorator for Rules

To override global rules, we'll use `Nest metadata decorators`.

- `@apiCallQueryParamsFormatRuleOverride({})`:

  ```ts
  @apiCallQueryParamsFormatRuleOverride({
    apiCallQueryParamsFormat: {
      syntax: "':name':':value'",
      separator: ", ",
    }
  })
  function getUser() { /* ... */ }
  ```

- `@formattingRuleOverride({})`:

```ts
  @formattingRuleOverride({
      formatting: {
      :apiCallSubject: "normal",
      :apiCallQueryParamName: {
        replaceValueBy: ["uuid", "UUID"]
      },
    }
  })
  function getUser() { /* ... */ }
  ```

- `@messageRuleOverride({})`:

  ```ts
  @messageRuleOverride({
    success: "",
    error: "",
  })
  function getUser() { /* ... */ }
  ```

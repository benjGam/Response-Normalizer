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

### Globals

- `:apiCallQueryParamsFormat`:
  - sub params: `:value`, `:name`.
  - `formatting`: `upper`, `lower`, `normal`, `unchanged`.
  - `replacing`: Another text replacing `:name`.
- `:apiCallSubject`:
  - `formatting`: `upper`, `lower`, `normal`, `unchanged`.

## Sample

### Getting Users of an API

Responsible `Nest Module` name: `UsersModule`.

```http
GET http://localhost:3000/users
```

```json
"message": "Users has been getted.",
"data": [
  {
    "username": "test1",
    "password": "...",
  }, 
  {
    "username": "test2",
    "password": "...",
  }
],
"statusCode": 200,
```

### Getting User of an API

Responsible `Nest Module` name: `UsersModule`.

```http
GET http://localhost:3000/users?username=test1
```

```json
"message": "User has been getted for 'test1' username.",
"data": {
    "username": "test1",
    "password": "...",
  },
"statusCode": 200,
```

### Getting User of an API (Using `dotNotIncludeQueryParams` metadata decorator)

Responsible `Nest Module` name: `UsersModule`.

```http
GET http://localhost:3000/users?username=test1
```

```json
"message": "User has been getted.",
"data": {
    "username": "test1",
    "password": "...",
  },
"statusCode": 200,
```

### Getting User of an API (Using `apiCallQueryParamsFormat` global rule)

Responsible `Nest Module` name: `UsersModule`.

```http
GET http://localhost:3000/users?username=test1
```

```json
"message": "User has been getted ('username':'test').",
"data": {
    "username": "test1",
    "password": "...",
  },
"statusCode": 200,
```

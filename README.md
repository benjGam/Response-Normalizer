# Response Normalizer

Response Normalizer is a sub system that allows you to avoid NestJS responses normalization. It will handle it for you. 

```json
{
  "message": "...", // Auto generated message
  "data":"service returned datas", // ORM / DB datas
  "statusCode": 200, // Request associated success status code
}
```

## Features

- Plural or Singular form for used query params (Calculated in RT).
- Externally managed logic by using `@ExternalService(ServiceType)` metadata decorator above controller method decorator.
- Configuration
  - Success messages formatting (globally & locally)
  - ORM exceptions messages formatting (globally)

## Usage

To use module into your own project, proceed as following :

```sh
npm install response-normalizer
```

And boostrap it into your `boostrap` function :

`main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { CategoriesModule } from './app.module';
import { init } from 'response-normalizer';
import {} from '@nestjs/common/interfaces/nest-application-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(CategoriesModule);
  init(app);
  await app.listen(3000);
}
bootstrap();
```

## Message personnalization

### Globally

To personnalize messages globally, you can personnalize them directly from module bootstraping.

```ts
init(app, {
  successMessages: {
    createdMessage: '::subjectModuleName has been created', // This is default value, you can set it as you want
  }
})
```

### Locally

`@CustomResponseMessage('...')` metadata decorator can be used above controller method declaration to customize the response message format for this specific route.

### Aliases

Aliases can be used as shorthand of real internal object keys interpretation from message builder (internal sys) what he has to put and above all where it has to be putted. So to do it, you should preffix aliases by `::` syntax to indicate that you want message interpretor to replace `::...` by corresponding value.

**Status code aliases :**

```json
["statuscode", "sc", "status", "stcd", "stc", "code"]
```

**Query params aliases :**

```json
["stringifiedqueryparams", "queryparams", "qp"]
```

**Subject module aliases :**

```json
[
  "subjectmodulename",
  "modulename",
  "submodulename",
  "mn",
  "smn",
  "module",
  "submodule",
  ]
```

Note: Subject module refers to logic module (e.g: Logic module is named 'User', so the subject module will refer to 'User')

### Query Params Options

Query params can be personnalized by using configuration system (in bootstraping module)

**Joiner configuration** :

```ts
init(app, {
    queryParamsOptions: {
      joinedBy: ', ',
    },
  });
```

**Formatting rules**

It may happens that you have some verbs that you wish to format as UPPER or lower form or else to replace by totally different thing. To do it, proceed as following :

```ts
init(app, {
    queryParamsOptions: {
      formattingRules: [
        {
          subStringSequence: 'uuid',
          casing: WordCasing.UPPERED,
        },
      ],
    },
  });
```

Note: A `@IgnoreFormattingRules()` decorator should be available soon.
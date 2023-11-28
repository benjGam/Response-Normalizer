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

- Plural or Singular form for used query params (Calculated in RT)

## Usage

To use Response Normalizer in your NestJS API, you can do it as following :

```sh
npm install response-normalizer
```

And init package into your `boostrap` function :

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

## Personnalization

I worked a lil bit on module personnalization issues, so we have now an object specifically dedicated to it. 

You can configure module by passing an object in `init` function declaration.

### Message personnalization

I added an decorator `@CustomResponseMessage('your_message_here')` to customize messages if needed, you can use it on Controller handler. 

There's some aliases to put as interpreted flags.

```json
{
    "subjectModuleName": [
      "subjectmodulename",
      "modulename",
      "submodulename",
      "mn",
      "smn",
      "module",
      "submodule",
    ],
    "stringifiedQueryParams": ["stringifiedqueryparams", "queryparams", "qp"],
    "statusCode": ["statuscode", "sc", "status", "stcd", "stc", "code"],
  }
```

So, to use them you should prefix them by '::' like '::mn' will be interpreted as 'subjectModuleName' and will be replaced by the module name. You can ignore casing, it will be lowered to avoid uninterpretation errors.

## Conclusion

That's quite all, every help most welcome ! Do not forgot to request some ideas, it will be a pleasure to discuss about.

Enjoy !

<details>
<summary><h2>To Do</h2></summary>

- [x] **Fix Exception Filter to permeet to Nest to return correctly Validation Pipe errors**
  - [ ] Make fix more reliable
- [x] **Improve Configuration**
  - [x] Add way to configure how query params should be joined
  - [x] Add way to apply specific rule on query params (As 'uuid' should be uppered or lowered or also being replace by a total different thing like 'Universally Unique Identifer' or that kind of stuff)
- [ ] **Normalize ORM errors**
  - [ ] Add super class for ORM interceptor
  - [ ] Conceptualize way to get ORM without any changes from end user 
  - [ ] Add Configuration to enable it or not
- [ ] **Add Experimental Mode to handle automatically external service logic**
  - [x] Conceptualize it
  - [ ] Add Configuration to enable experimental mode

</details>

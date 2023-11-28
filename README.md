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

### Message personnalization

#### Locally

`@CustomResponseMessage('...')` metadata decorator can be used above controller method declaration to customize the response message format for this specific route.

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

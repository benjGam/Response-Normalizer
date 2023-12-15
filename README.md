# Response Normalizer

Response Normalizer is a package which handle NestJS responses normalization.

**Responses format:**

```json
{
  "message": "...", // Auto generated message
  "data":"service returned datas", // ORM / DB datas
  "statusCode": 200, // Request associated success status code
}
```

## Installation & Bootstraping

To install Response Normalizer it's quite easy, just type the following command in your shell:

```sh
npm install response-normalizer
```

To use Response Normalizer, proceed as following:

`main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { init } from 'response-normalizer'; //Import bootstrap function

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  init(app); // Use bootstrap function which need an 'INestApplication' object (Here 'app')
  await app.listen(3000);
}
```

With this setup, Response Normalizer will hook every API Endpoints and normalize responses before return them to client.
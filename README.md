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
  const app = await NestFactory.create(AppModule);
  init(app); // Use bootstrap function which need an 'INestApplication' object (Here 'app')
  await app.listen(3000);
}
```

With this setup, Response Normalizer will hook every API Endpoints and normalize responses before return them to client.

## Personalization

There's many way to personalize Response Normalizer returns, let's dig througth them.

### Messages

You can obviously personnalize format of builded messages.

`main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { init } from 'response-normalizer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  init(app, {
    exceptionMessages: {
      alreadyRegistered: '::subjectModuleName was already registered', //Default value, set is as you want
    },
    successMessages: {
      createdMessage: '::subjectModuleName has been registered', //Default value, set is as you want
    },
  });
  await app.listen(3000);
}
```

By setting up Response Normalizer like that, you'll be able to overwrite default messages patterns by your owns. 

#### Identifiers for messages patterns injection

There's 2 ways to tell to module, which value do you want to put into your messages.

Here's the list of keys to inject real values into your message: 

- **subjectModuleName**: This represents the name of handler module.
    ```ts
    import { AwesomeService } from './awesome-service.service';
    import { CreateAwesomeRessourceDto } from './dto/create-awesome-ressource.dto';

    @Controller()
    export class AwesomeController {
      constructor(
        private readonly awesomeService: AwesomeService,
      ) {}

      @Post()
      public create(@Body() createAwesomeRessourceDto : CreateAwesomeRessourceDto) {
        return this.awesomeService.create(createAwesomeRessourceDto);
      }
    }
    ```
    `::subjectModuleName` will be `Awesome` (or `Awesomes` depending on returned data)
- **stringifiedQueryParams**: This represents list of query params with handler was invoked or supposed to be invoked.
    ```ts
    import { AwesomeService } from './awesome-service.service';
    import { CreateAwesomeRessourceDto } from './dto/create-awesome-ressource.dto';

    @Controller()
    export class AwesomeController {
      constructor(
        private readonly awesomeService: AwesomeService,
      ) {}

      @Post()
      public create(@Body() createAwesomeRessourceDto : CreateAwesomeRessourceDto) {
        return this.awesomeService.create(createAwesomeRessourceDto);
      }

      @Get(':uuid') // <-        ↓      ↓   This query param
      public getByUUID(@Param('uuid') uuid: string) {
        return this.awesomeService.getByUUID(uuid);
      }
    }
    ```
    `::stringifiedQueryParams` will be `for '5b890609-f862-4a6e-b1dd-89467c2de36b' Uuid` (There's some way to personalize this format, see below)
- **statusCode**: `::statusCode` will represents the response status code (Not used in default templates).

But 'cause it can be long and tricky to remember, some aliases are available:

- **subjectModuleName**: `'subjectmodulename', 'modulename', 'submodulename', 'mn', 'smn', 'module', 'submodule'`.
- **stringifiedQueryParams**: `'stringifiedqueryparams', 'queryparams', 'qp'`.
- **statusCode**: `'statuscode', 'sc', 'status', 'stcd', 'stc', 'code'`.
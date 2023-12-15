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

You can obviously personalize format of builded messages.

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
    <details>
    <summary>Code</summary>

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
    </details>
- **stringifiedQueryParams**: This represents list of query params with handler was invoked or supposed to be invoked.
    <details>
    <summary>Code</summary>

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
    </details>
- **statusCode**: `::statusCode` will represents the response status code (Not used in default templates).

But 'cause it can be long and tricky to remember, the other way to inject values is aliases: <a id='aliases'></a>

- **subjectModuleName**: `'subjectmodulename', 'modulename', 'submodulename', 'mn', 'smn', 'module', 'submodule'`.
- **stringifiedQueryParams**: `'stringifiedqueryparams', 'queryparams', 'qp'`.
- **statusCode**: `'statuscode', 'sc', 'status', 'stcd', 'stc', 'code'`.

#### Stringified Query Params formating

It's possible to personalize the format of query params.

`main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { init } from 'response-normalizer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  init(app, {
    queryParamsOptions: {
      joinedBy: ', ',
      formattingRules: [
        {
          subStringSequence: 'uuid',
          casing: WordCasing.UPPERED,
        },
      ],
    },
  });
  await app.listen(3000);
}
```

By adding `queryParamsOptions` object, it's possible to dig into options, there's 2 keys to personnalize format:

- `joinedBy`: This represents the operator of joining (**DEFAULT**: 'and')
    <details>
    <summary>Code</summary>

    ```ts
    import { AwesomeService } from './awesome-service.service';
    import { CreateAwesomeRessourceDto } from './dto/create-awesome-ressource.dto';

    @Controller()
    export class AwesomeController {
      constructor(
        private readonly awesomeService: AwesomeService,
      ) {}

      @Get(':uuid/:anotherCriteria')
      public getByUUIDAndAnotherCriteria(
        @Param('uuid') uuid: string, 
        @Param('anotherCriteria') anotherCriteria: string) {
        return this.awesomeService.getByUUIDAndAnotherCriteria(uuid, anotherCriteria);
      }
    }
    ```
    `::stringifiedQueryParams` will be `for '5b890609-f862-4a6e-b1dd-89467c2de36b' Uuid and 'value_here' Another Criteria`
    </details>
- `formattingRules`: This is an object that permeet to format specifically rules for a query params term.
    <details>
    <summary>Code</summary>

    ```ts
    import { AwesomeService } from './awesome-service.service';
    import { CreateAwesomeRessourceDto } from './dto/create-awesome-ressource.dto';

    @Controller()
    export class AwesomeController {
      constructor(
        private readonly awesomeService: AwesomeService,
      ) {}

      @Get(':uuid')
      public getByUUID(@Param('uuid') uuid: string) {
        return this.awesomeService.getByUUID(uuid);
      }
    }
    ```
    Formatting rules definition: 
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
    Will make return of getByUUID handler invokation looks like : `for '5b890609-f862-4a6e-b1dd-89467c2de36b' UUID`.
    </details>

    Formatting rules objects has a `replaceBy` key which make you able to replace the `subStringSequence` by something totally different (like: for 'uuid' replace by 'Universally Unique Identifier')

### Decorators

Also, package provides many decorators, here's a list:

- `CustomResponseMessage(message)`: This decorator has to be applied above handler declaration.
    <details>
    <summary>Code</summary>

    ```ts
    import { AwesomeService } from './awesome-service.service';
    import { CreateAwesomeRessourceDto } from './dto/create-awesome-ressource.dto';
    import { CustomResponseMessage } from 'response-normalizer';

    @Controller()
    export class AwesomeController {
      constructor(
        private readonly awesomeService: AwesomeService,
      ) {}

      @Get(':uuid')
      @CustomResponseMessage('My custom message here') // <- Decorator
      public getByUUID(@Param('uuid') uuid: string) { // <-- Handler declaration
        return this.awesomeService.getByUUID(uuid);
      }
    }
    ```

    Using this decorator means "Message pattern for this route is this", it also takes injectable identifiers (`::subjectModuleName`, ...)
    </details>
- `ExternalService(type)`: This decorator has to be applied above handler declaration, and has to be used when your logic is in another module.
    <details>
    <summary>Code</summary>

    ```ts
    import { AwesomeService } from './awesome-service.service';
    import { AnotherAwesomeService } from '../another-awesome-module/another-awesome-service.service'; // <- Not the same module which is responsible of service
    import { CreateAwesomeRessourceDto } from './dto/create-awesome-ressource.dto';
    import { ExternalService } from 'response-normalizer';

    @Controller()
    export class AwesomeController {
      constructor(
        private readonly awesomeService: AwesomeService,
        private readonly anotherAwesomeService: AnotherAwesomeService, // Another service
      ) {}

      @Get(':uuid')
      @ExternalService(AnotherAwesomeService) // <- Decorator (with the type of the service /!\ not the name of properties, the type of service)
      public getByUUID(@Param('uuid') uuid: string) { // <-- Handler declaration
        return this.anotherAwesomeService.getByUUID(uuid);
      }
    }
    ```

    Using this decorator means "The subject module isn't the same as handler".
    </details>
- `IgnoreFormattingRules(string[])`: This decorator has to be applied above handler declaration, and has to be used if you want to do not apply specific (or all) rules.
    <details>
    <summary>Code</summary>

    ```ts
    import { AwesomeService } from './awesome-service.service';
    import { CreateAwesomeRessourceDto } from './dto/create-awesome-ressource.dto';
    import { IgnoreFormattingRules } from 'response-normalizer';

    @Controller()
    export class AwesomeController {
      constructor(
        private readonly awesomeService: AwesomeService,
      ) {}

      @Get(':uuid')
      @IgnoreFormattingRules(['uuid']) // <- Decorator
      public getByUUID(@Param('uuid') uuid: string) { // <-- Handler declaration
        return this.awesomeService.getByUUID(uuid);
      }
    }
    ```

    Using this decorator means "For the formatting rule where `subStringSequence` is contained in table, do not apply formatting". If you do not specify any rule, all formatting rules will be ignored.
    </details>
- `IgnoreNormalization()`: This decorator has to be applied above handler declaration. It's used to do not submit handler response to any form of normalization.
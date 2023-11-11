# Response Normalizer

Response Normalizer is a sub system that allows you to avoid NestJS responses normalization. It will handle it for you. 

## For instance

We assume that ':uuid' = 'hey'

`app.controller.ts` :

```ts
@Controller()
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get(':uuid')
  getUser(@Param('uuid') uuid: string) {
    this.appService.getUser(uuid);
  }
}
```

`app.service.ts` :

```ts
@Injectable()
export class UsersService {
  getUser(uuid: string) {
    //getting logic here
  }
}
```

Response Normalizer will return a response as : 

```json
{
  "message": "User for 'hey' Uuid has been found",
  "data":"service returned datas",
  "statusCode":200,
}
```

## What's taken in charge

- If your logic return not only one result but many, it will be handled by adding corresponding plural form for word (e.g: 'User' -> 'Users', 'Category' -> 'Categories', ...)
- If you have not one query param but many, they'll be joined with 'and' and appears in order they were declared in handler declaration.
- If your logic depends on another service, it handled by using '@ExternalService(ServiceType)' decorator on your handler declaration (Controller method).

## What's next

### Manage Empty Returned Datas (Unmanaged by ORM throwing)

The management of empty datas is not currently implemented, i already developed that part, but i'm currently thinking on how to cleanly implement it in package.

### Manage Fastify

At this moment, Response Normalizer isn't compatible with Fastify, only with Express (Used by default with Nest), it will be implement later.

### Clean Imports

I know that package imports are terribly shitty, it will be fix later, i'm currently working on that issue for publishing clean Node Package using TS and all that stuff. It will be fix.

### Manage ORM Error Normalizer

As for empty data, i already developed that part (Only for Prisma), i'm currently thinking on how implement it, if i make a new package or not, if i implement that directly there.

## Usage

If you wish to implement Response Normalizer Interceptor, you can do it as : 

```sh
npm i response-normalizer
```

And add : 

```ts
import { NormalizerInterceptor } from 'response-normalizer/lib/normalizer.interceptor';
app.useGlobalInterceptors(new NormalizerInterceptor());
```

In your boostrap function from `main.ts`.

It will be initialized and will work without anymore to do.

## Personnalization

I did not really go deep into personnalization for now, but you can already personnalize response messages, it will requires some developpement from you to do it.

First, you'll need to create a new custom interceptor (That you should use instead of Normalizer one), and make him extends 'NormalizerInterceptor' and put it into : 

```ts
private dispatchSuccessResponseByHttpMethod(data: any) {
    const parsedExecContextObject = super.parsedContext.toJSON();
    switch (parsedExecContextObject.httpMethod) {
      case 'POST':
        return new CreatedResponse(parsedExecContextObject, data, {
          message: `Your message here`,
          statusCode: 200,
        }).toJSON();
      case 'GET':
        return new GettedResponse(parsedExecContextObject, data).toJSON();
      case 'PATCH':
        return new UpdatedResponse(parsedExecContextObject, data).toJSON();
      case 'DELETE':
        return new DeletedResponse(parsedExecContextObject, data).toJSON();
      default:
        throw new Error(
          `HTTP Method ${parsedExecContextObject.httpMethod} not implemented`,
        );
    }
  }
```

There's some aliases to put interpreted flags.

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

So, to use them you should prefix them by '::' like '::mn' will be interpreted as 'subjectModuleName' and will be replace by the module name. You can ignore casing match, it will be lowered to avoid uninterpretation errors.
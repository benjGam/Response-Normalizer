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

### Manage ORM Error Normalizer

As for empty data, i already developed that part (Only for Prisma), i'm currently thinking on how implement it, if i make a new package or not, if i implement that directly there.

## Personnalization

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
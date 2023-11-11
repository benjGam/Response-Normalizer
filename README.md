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
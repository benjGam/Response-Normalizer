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
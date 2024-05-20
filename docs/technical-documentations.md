# Technical Documentation

## Normalization process

The normalization process will use **Nest interceptor**, we will also use `Reflector` provided by Nest to hook cleanly.
Also, the process should be able to manage errors as it. Error of ORMs will be managed by the package itself to return clean error messages. 
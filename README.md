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
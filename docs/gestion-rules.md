# Gestion Rules

## Package

- SHOULD provide a way to normalize responses of Nest APIs calls.
- MUST provide a way to personalize basic normalization rules on bootstraping.
- MUST provide a basic format for normalized APIs calls responses :
  - ```json
    "message":"",
    "data": {},
    "statusCode": 200
    ```

## Global scope normalization rules

- MUST be applied to all APIs endpoint as defined (or not) default rules.
- SHOULD be overwritten by local normalization rules.

## Local scope normalization rules

- COULD be applied on a specific APIs endpoint.
  - COULD be applied by using Nest metadata decorators on APIs endpoints.
- MUST NOT change responses format.
- MUST provide a way to do not apply normalization process on specific APIs endpoints.

## Normalization process

- SHOULD be as lightweight as possible.
- MUST provide a way to personalize responses depending on some factors.
  - MUST provide a way to apply normalization rules on global or local scope.

## Response formatting

### `message` field

- MUST be auto-builded based on the `Module` invoked by the API call.
- MUST be present in minimal response.
- MUST be overridable by a local rule.

### `data` field

- MUST be auto-filled based on the return of invoked API endpoint.
- MUST be present in minimal response.

### `statusCode` field

- MUST be determined by the return of invoked API endpoint.
- COULD be ignored in response format.

## Interpretor Parameters

- Are values that package provide to be replaced by real values (evaluated during executing time).

## Rules

- Are litterals objects whose COULD contains other rules.
- Are used to apply a particular behavior on components of package.
- MUST have a default value if user doesn't set it.
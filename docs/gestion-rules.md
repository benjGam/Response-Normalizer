# Gestion Rules

## Package

- The package should provide a way to normalize responses of Nest APIs calls.
- The package MUST provide a way to personalize basic normalization rules on bootstraping.
- The package MUST provide a base format for normalized APIs calls responses :
  - ```json
    "message":"",
    "data": {},
    "statusCode": 200
    ```

## Global scope normalization rules

- Global normalization rules must be applied to all APIs endpoint as defined (or not) default rules.
- Global normalization rules should be overwritten by local normalization rules.

## Local scope normalization rules

- Local normalization rules can be applied on a specific APIs endpoint.
  - Local normalization rules can be applied by using Nest metadata decorators on APIs endpoints.
- Local normalization rules MUST NOT change responses format.

## Normalization process

- SHOULD be as lightweight as possible.
- SHOULD provide a way to personalize responses depending on some factors.
  - SHOULD provide a way to apply normalization rules on global or local scope.
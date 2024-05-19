# Gestion Rules

## Package

- The package should provide a way to normalize responses of Nest APIs calls.
  - Normalization process should be as lightweight as possible.
  - Normalization process should provide a way to personalize responses depending on some factors.
    - Normalization process should provide a way to apply normalization rules on global or local scope.

## Global scope normalization rules

- Global normalization rules must be applied to all APIs endpoint as defined (or not) default rules.
- Global normalization rules should be overwritten by local normalization rules.
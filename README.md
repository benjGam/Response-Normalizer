# Response Normalizer

[![npm version](https://badge.fury.io/js/response-normalizer.svg)](https://badge.fury.io/js/response-normalizer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Response Normalizer is a comprehensive NestJS package designed to standardize and enhance HTTP response handling across your entire application. It automatically intercepts and transforms all responses to follow a consistent, predictable format, making your API more professional and easier to consume.

### Why Response Normalizer?

- **Consistency**: Ensures all your API endpoints return responses in the same format, improving client-side integration and reducing development time
- **Automatic Message Generation**: Intelligently generates human-readable messages based on the context of each request
- **Error Handling**: Provides unified error handling with consistent error response formats
- **Flexibility**: Offers extensive customization options while maintaining zero-config defaults
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Performance**: Minimal overhead with optimized response transformation

## Table of Contents

- [Response Normalizer](#response-normalizer)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Response Format](#response-format)
  - [Configuration](#configuration)
    - [Basic Configuration](#basic-configuration)
    - [Message Customization](#message-customization)
    - [Query Parameters Formatting](#query-parameters-formatting)
  - [Decorators](#decorators)
  - [Advanced Usage](#advanced-usage)
  - [Best Practices](#best-practices)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- 🚀 Automatic response normalization
- 🎯 Consistent response format across all endpoints
- 🛠 Customizable message patterns
- 🔧 Flexible configuration options
- 📝 Built-in decorators for fine-grained control
- 🔍 Query parameter formatting
- ⚡ Zero configuration needed to get started

## Prerequisites

Before you begin, ensure you have:
- Node.js (v12 or higher)
- NestJS application (v8 or higher)
- npm or yarn package manager

## Installation

```bash
# Using npm
npm install response-normalizer

# Using yarn
yarn add response-normalizer
```

## Quick Start

1. Install the package as shown above
2. Import and configure in your `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrapNormalizer } from 'response-normalizer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Basic setup - uses default configuration
  bootstrapNormalizer(app);
  
  await app.listen(3000);
}
bootstrap();
```

That's it! Your application now automatically normalizes all responses.

## Response Format

All responses will follow this standardized format:

```typescript
{
  "message": string,    // Auto-generated or custom message
  "data": any,         // Your response data
  "statusCode": number // HTTP status code (optional)
}
```

Example response:
```json
{
  "message": "User has been successfully created",
  "data": {
    "id": "123",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "statusCode": 201
}
```

## Configuration

### Basic Configuration

You can customize the global behavior when bootstrapping:

```typescript
bootstrapNormalizer(app, {
  includeStatusCode: false,  // Remove statusCode from responses
  messages: {
    success: {
      createdMessage: "::subjectModuleName has been created successfully",
      updatedMessage: "::subjectModuleName has been updated successfully",
      // ... other message patterns
    },
    errors: {
      notFound: "::subjectModuleName not found ::stringifiedQueryParams",
      // ... other error patterns
    }
  }
});
```

### Message Customization

Messages can include dynamic values using special identifiers:

- `::subjectModuleName` - Name of the controller/module
- `::stringifiedQueryParams` - Formatted query parameters
- `::statusCode` - HTTP status code

Aliases are also available for better readability:
- `::mn` or `::module` for module name
- `::qp` for query parameters
- `::sc` for status code

Example usage in a controller:

```typescript
@Controller('users')
export class UsersController {
  @Post()
  @CustomResponseMessage("New ::subjectModuleName created with ::stringifiedQueryParams")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

### Query Parameters Formatting

Customize how query parameters appear in messages:

```typescript
bootstrapNormalizer(app, {
  queryParamsOptions: {
    joinedBy: ", ",  // Default is "and"
    formattingRules: [
      {
        subStringSequence: "uuid",
        casing: WordCasing.UPPERED,
        replaceBy: "Universally Unique Identifier"  // Optional
      }
    ]
  }
});
```

## Decorators

The package provides several decorators for fine-grained control:

1. `@CustomResponseMessage(message: string)`
   - Customize response message for specific endpoints
   ```typescript
   @CustomResponseMessage("Custom success message for ::subjectModuleName")
   @Get(':id')
   findOne(@Param('id') id: string) {
     return this.service.findOne(id);
   }
   ```

2. `@ExternalService(type: Type)`
   - Specify when using services from different modules
   ```typescript
   @ExternalService(PaymentService)
   @Post('process-payment')
   processPayment(@Body() paymentDto: PaymentDto) {
     return this.paymentService.process(paymentDto);
   }
   ```

3. `@IgnoreFormattingRules(rules?: string[])`
   - Skip specific or all formatting rules
   ```typescript
   @IgnoreFormattingRules(['uuid'])
   @Get(':uuid')
   findByUUID(@Param('uuid') uuid: string) {
     return this.service.findByUUID(uuid);
   }
   ```

4. `@IgnoreNormalization()`
   - Skip normalization for specific endpoints
   ```typescript
   @IgnoreNormalization()
   @Get('raw-data')
   getRawData() {
     return this.service.getRawData();
   }
   ```

## Best Practices

1. **Consistent Naming**: Use clear, consistent module names for better auto-generated messages
2. **Message Templates**: Keep message templates simple and informative
3. **Error Handling**: Let the normalizer handle error responses for consistent error formats
4. **Validation**: Combine with NestJS validation pipes for comprehensive request validation

## Troubleshooting

Common issues and solutions:

1. **Messages Not Formatting Correctly**
   - Verify module naming conventions
   - Check identifier syntax (::identifier)
   - Ensure decorators are properly applied

2. **Normalization Not Working**
   - Verify bootstrapNormalizer is called before app.listen()
   - Check for @IgnoreNormalization() decorators
   - Ensure endpoint is not in excluded routes

## Contributing

We value and welcome contributions from the community! Here's how you can contribute to Response Normalizer:

### Getting Started

1. **Fork the Repository**
   ```bash
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/response-normalizer.git
   cd response-normalizer
   
   # Add upstream remote
   git remote add upstream https://github.com/ORIGINAL_OWNER/response-normalizer.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Guidelines

1. **Code Style**
   - Follow the existing code style
   - Use TypeScript features appropriately
   - Maintain consistent naming conventions
   - Add JSDoc comments for public APIs

2. **Testing**
   - Write unit tests for new features
   - Ensure all tests pass: `npm test`
   - Maintain or improve code coverage
   - Include integration tests when necessary

3. **Documentation**
   - Update README.md for new features
   - Add JSDoc comments for new functions/methods
   - Include examples in documentation
   - Update CHANGELOG.md

### Submission Process

1. **Before Submitting**
   - Run all tests: `npm test`
   - Run linter: `npm run lint`
   - Format code: `npm run format`
   - Update documentation if needed

2. **Creating a Pull Request**
   - Push your changes to your fork
   - Create a pull request from your branch
   - Fill out the PR template completely
   - Link any related issues

3. **Code Review**
   - Address review comments promptly
   - Keep the PR focused on a single feature/fix
   - Be open to feedback and suggestions

### Reporting Issues

- Use the issue tracker to report bugs
- Include detailed steps to reproduce
- Provide system/environment information
- Use the issue template if available

### Community

- Follow our Code of Conduct
- Be respectful and constructive
- Help others in discussions
- Share your ideas in Discussions

For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

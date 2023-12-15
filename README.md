# Either Pattern TypeScript Project

## Overview

This TypeScript project demonstrates the usage of the Either pattern, a functional programming concept, to handle success and error scenarios in a more expressive and composable way. The Either type can represent either a success value (`Right`) or an error value (`Left`), providing a clean and structured way to handle different outcomes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/gustavovalle23/either-pattern
   ```

2. Navigate to the project directory:

   ```bash
   cd either-pattern
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

## Usage

To use the Either pattern in your TypeScript project, import the `Either` class from the `either.ts` file. The `Either` class takes two type parameters: the success type and the error type.

```typescript
import { Either } from './either';

// Example usage
const result: Either<string, number> = Either.right(42);

result.match({
  left: (error) => console.error(`Error: ${error}`),
  right: (value) => console.log(`Success: ${value}`),
});
```

## Examples

### Handling Success

```typescript
import { Either } from './either';

const successResult: Either<string, number> = Either.right(42);

successResult.match({
  left: (error) => console.error(`Error: ${error}`),
  right: (value) => console.log(`Success: ${value}`),
});
```

### Handling Error

```typescript
import { Either } from './either';

const errorResult: Either<string, number> = Either.left('An error occurred');

errorResult.match({
  left: (error) => console.error(`Error: ${error}`),
  right: (value) => console.log(`Success: ${value}`),
});
```

### Chaining Operations

```typescript
import { Either } from './either';

function divide(x: number, y: number): Either<string, number> {
  if (y === 0) {
    return Either.left('Division by zero');
  }
  return Either.right(x / y);
}

const result = divide(10, 2)
  .flatMap((value) => divide(value, 5))
  .match({
    left: (error) => console.error(`Error: ${error}`),
    right: (value) => console.log(`Success: ${value}`),
  });
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
# Wrapper

A TypeScript utility for method chaining and value wrapping with tap functionality.

**[中文文档](./README.zh.md)**

## Features

- 🎯 **Type-safe**: Full TypeScript support with generics
- 🔗 **Method chaining**: Chain multiple operations fluently
- 📦 **Lightweight**: Zero dependencies, minimal footprint
- 🎛️ **Context binding**: Automatic `this` context binding for functions

## Installation

### Deno

```bash
deno add jsr:@tint/wrap
```

### Modern package managers (pnpm 10.9+, yarn 4.9+, vlt)

These versions support JSR out of the box:

```bash
pnpm add jsr:@tint/wrap
yarn add jsr:@tint/wrap
vlt install jsr:@tint/wrap
```

### Other package managers (npm, bun, older versions)

For npm, bun, or older versions of pnpm/yarn, use the JSR CLI:

```bash
# Automatically detects your package manager
npx jsr add @tint/wrap
bunx jsr add @tint/wrap
yarn dlx jsr add @tint/wrap
pnpm dlx jsr add @tint/wrap

# Or specify the package manager explicitly
npx jsr add @tint/wrap --npm
npx jsr add @tint/wrap --yarn
npx jsr add @tint/wrap --pnpm
```

The JSR CLI will automatically configure your `.npmrc` file to use the JSR registry. You should commit this file to source control to ensure future installations work correctly.

### Manual configuration

Alternatively, you can manually configure your package manager by adding this to your `.npmrc`:

```
@jsr:registry=https://npm.jsr.io
```

Then install using the `@jsr` scope:

```bash
npm install @jsr/tint__wrap
yarn add @jsr/tint__wrap
pnpm add @jsr/tint__wrap
```

For a cleaner import experience, you can add an alias to your `package.json`:

```json
{
  "dependencies": {
    "@tint/wrap": "npm:@jsr/tint__wrap@latest"
  }
}
```

Then import as:

```typescript
import { wrap } from "@tint/wrap";
```

## Usage

### Basic Example

```ts
import { wrap } from '@tint/wrap';

const user = wrap({ name: 'John', age: 30 });

// Chain operations
const result = user
  .tap(function() { console.log(this.name); }) // logs "John"
  .tap(function() { this.age++; })
  .tap(function(increment: number) { this.age += increment; }, 5)
  .unwrap(); // { name: 'John', age: 36 }

console.log(result); // { name: 'John', age: 36 }
```

### Array Manipulation

```ts
const numbers = wrap([1, 2, 3]);

numbers
  .tap(function() { this.push(4); })
  .tap(function() { this.sort((a, b) => b - a); })
  .unwrap(); // [4, 3, 2, 1]
```

### DOM Manipulation (Browser)

```typescript
const element = wrap(document.createElement('div'));

element
  .tap(function() { this.id = 'my-element'; })
  .tap(function() { this.className = 'container'; })
  .tap(function(text: string) { this.textContent = text; }, 'Hello World')
  .unwrap(); // <div id="my-element" class="container">Hello World</div>
```

## API

### `wrap<T>(value: T): Wrapper<T>`

Creates a wrapper instance around the provided value.

**Parameters:**
- `value: T` - The value to wrap

**Returns:**
- `Wrapper<T>` - A wrapper instance

### `Wrapper<T>.tap<F>(fn: F, ...args: Parameters<F>): Wrapper<T>`

Executes a function with the wrapped value as `this` context and returns the wrapper for chaining.

**Parameters:**
- `fn: F` - Function to execute (must not return a value)
- `...args: Parameters<F>` - Arguments to pass to the function

**Returns:**
- `Wrapper<T>` - The same wrapper instance for method chaining

### `Wrapper<T>.unwrap(): T`

Unwraps and returns the original value.

**Returns:**
- `T` - The original wrapped value

## Type Safety

The wrapper maintains full type safety throughout the chaining process:

```ts
interface User {
  name: string;
  age: number;
}

const user = wrap<User>({ name: 'Alice', age: 25 });

user.tap(function(this: User) { this.name = 'Bob'; }); // ✅ Type-safe
user.tap(function(this: User) { this.invalid = 'property'; }); // ❌ TypeScript error
```

## License

MIT

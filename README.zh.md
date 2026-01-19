# Wrapper

一个用于方法链式调用和值包装的 TypeScript 工具库，支持 tap 功能。

**[English Documentation](./README.md)**

## 特性

- 🎯 **类型安全**: 完整的 TypeScript 支持和泛型
- 🔗 **方法链式调用**: 流畅地链式操作多个方法
- 📦 **轻量级**: 零依赖，最小化占用空间
- 🎛️ **上下文绑定**: 自动为函数绑定 `this` 上下文

## 安装

### Deno

```bash
deno add jsr:@tint/wrap
```

### 现代包管理器 (pnpm 10.9+, yarn 4.9+, vlt)

这些版本原生支持 JSR：

```bash
pnpm add jsr:@tint/wrap
yarn add jsr:@tint/wrap
vlt install jsr:@tint/wrap
```

### 其他包管理器 (npm, bun, 较旧版本)

对于 npm、bun 或较旧版本的 pnpm/yarn，使用 JSR CLI：

```bash
# 自动检测包管理器
npx jsr add @tint/wrap
bunx jsr add @tint/wrap
yarn dlx jsr add @tint/wrap
pnpm dlx jsr add @tint/wrap

# 或明确指定包管理器
npx jsr add @tint/wrap --npm
npx jsr add @tint/wrap --yarn
npx jsr add @tint/wrap --pnpm
```

JSR CLI 会自动配置你的 `.npmrc` 文件以使用 JSR 注册表。你应该将此文件提交到源代码管理中，以确保未来的安装正常工作。

### 手动配置

或者，你可以通过在 `.npmrc` 中添加以下内容来手动配置包管理器：

```
@jsr:registry=https://npm.jsr.io
```

然后使用 `@jsr` 作用域安装：

```bash
npm install @jsr/tint__wrap
yarn add @jsr/tint__wrap
pnpm add @jsr/tint__wrap
```

为了获得更清晰的导入体验，你可以在 `package.json` 中添加别名：

```json
{
  "dependencies": {
    "@tint/wrap": "npm:@jsr/tint__wrap@latest"
  }
}
```

然后导入为：

```typescript
import { wrap } from "@tint/wrap";
```

## 使用方法

### 基础示例

```ts
import { wrap } from '@tint/wrap';

const user = wrap({ name: '张三', age: 30 });

// 链式操作
const result = user
  .tap(function() { console.log(this.name); }) // 输出 "张三"
  .tap(function() { this.age++; })
  .tap(function(increment: number) { this.age += increment; }, 5)
  .unwrap(); // { name: '张三', age: 36 }

console.log(result); // { name: '张三', age: 36 }
```

### 数组操作

```ts
const numbers = wrap([1, 2, 3]);

numbers
  .tap(function() { this.push(4); })
  .tap(function() { this.sort((a, b) => b - a); })
  .unwrap(); // [4, 3, 2, 1]
```

### DOM 操作 (浏览器环境)

```typescript
const element = wrap(document.createElement('div'));

element
  .tap(function() { this.id = 'my-element'; })
  .tap(function() { this.className = 'container'; })
  .tap(function(text: string) { this.textContent = text; }, '你好世界')
  .unwrap(); // <div id="my-element" class="container">你好世界</div>
```

## API

### `wrap<T>(value: T): Wrapper<T>`

围绕提供的值创建包装器实例。

**参数:**
- `value: T` - 要包装的值

**返回值:**
- `Wrapper<T>` - 包装器实例

### `Wrapper<T>.tap<F>(fn: F, ...args: Parameters<F>): Wrapper<T>`

执行函数，将包装的值作为 `this` 上下文，并返回包装器以支持链式调用。

**参数:**
- `fn: F` - 要执行的函数（必须不返回值）
- `...args: Parameters<F>` - 传递给函数的参数

**返回值:**
- `Wrapper<T>` - 相同的包装器实例，用于方法链式调用

### `Wrapper<T>.unwrap(): T`

解包并返回原始值。

**返回值:**
- `T` - 原始包装的值

## 类型安全

包装器在整个链式调用过程中保持完整的类型安全：

```ts
interface User {
  name: string;
  age: number;
}

const user = wrap<User>({ name: '李四', age: 25 });

user.tap(function(this: User) { this.name = '王五'; }); // ✅ 类型安全
user.tap(function(this: User) { this.invalid = 'property'; }); // ❌ TypeScript 错误
```

## 许可证

MIT

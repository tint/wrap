/**
 * Wrapper interface that provides method chaining and value unwrapping functionality
 * @template T The type of the wrapped value
 */
export interface Wrapper<T> {
  /**
   * Executes a function without modifying the wrapped value
   * @template F Function type constrained to functions that don't return a value
   * @param fn The function to execute, 'this' context will be bound to the wrapped value
   * @param args Arguments to pass to the function
   * @returns The wrapper itself for method chaining
   *
   * @example
   * ```ts
   * const user = wrap({ name: 'John', age: 30 });
   *
   * user
   *   .tap(function() { console.log(this.name); }) // logs "John"
   *   .tap(function() { this.age++; })
   *   .tap(function(increment: number) { this.age += increment; }, 5)
   *   .unwrap(); // { name: 'John', age: 36 }
   * ```
   */
  tap<F extends (this: T, ...args: unknown[]) => void>(
    fn: F,
    ...args: Parameters<F>
  ): Wrapper<T>;

  /**
   * Unwraps and returns the original value
   * @returns The original wrapped value
   */
  unwrap(): T;
}

/**
 * Creates a wrapper instance
 * @template T The type of the value to wrap
 * @param value The value to wrap
 * @returns A wrapper instance
 */
export function wrap<T>(value: T): Wrapper<T> {
  const wrapper = {
    /**
     * Executes a function and returns the wrapper itself
     * Uses fn.call() to bind the function's 'this' context to the wrapped value
     */
    tap: <F extends (this: T, ...args: unknown[]) => void>(
      fn: F,
      ...args: Parameters<F>
    ): Wrapper<T> => {
      fn.call(value, ...args);
      return wrapper;
    },

    /**
     * Returns the original wrapped value
     */
    unwrap: (): T => value,
  };

  return wrapper;
}

export default wrap;

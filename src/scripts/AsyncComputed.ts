import { createDecorator, VueDecorator } from "vue-class-component";
import { IAsyncComputedValue } from "vue-async-computed";

interface ComputedProperties<T> {
  default?: T | (() => T);
  watch?: string[] | (() => void);
  shouldUpdate?: () => boolean;
  lazy?: boolean;
}

export function AsyncComputed<T>(
  computedOptions?: ComputedProperties<T>
): VueDecorator {
  return createDecorator((options, key) => {
    if (options.asyncComputed === undefined) options.asyncComputed = {};
    if (options.methods !== undefined && options.methods[key] !== undefined) {
      const method = options.methods[key];
      options.asyncComputed[key] = {
        get: method,
        ...computedOptions,
      } as IAsyncComputedValue<T>;
      delete options.methods[key];
    }
  });
}

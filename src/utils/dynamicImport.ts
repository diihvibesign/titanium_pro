import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { idlePromise } from './idleLoad';

type ModuleWithDefault<T> = { default: ComponentType<T> };

export function lazyWithIdle<T>(
  importer: () => Promise<ModuleWithDefault<T>>,
  options?: { idle?: boolean; timeout?: number }
): LazyExoticComponent<ComponentType<T>> {
  if (options?.idle) {
    return lazy(() => idlePromise(importer, options.timeout));
  }

  return lazy(importer);
}

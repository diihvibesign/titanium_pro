export function runWhenIdle(callback: () => void, timeout = 1200): () => void {
  if (typeof window === 'undefined') return () => {};

  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const timer = window.setTimeout(callback, Math.min(timeout, 500));
  return () => window.clearTimeout(timer);
}

export function idlePromise<T>(loader: () => Promise<T>, timeout = 1200): Promise<T> {
  return new Promise((resolve, reject) => {
    const cleanup = runWhenIdle(() => {
      loader().then(resolve).catch(reject);
    }, timeout);

    window.addEventListener('beforeunload', cleanup, { once: true });
  });
}

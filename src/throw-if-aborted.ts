export class AbortError extends Error {
  constructor(message: string = 'Operation was aborted') {
    super(message);
    this.name = 'AbortError';
  }
}

export function throwIfAborted(signal: AbortSignal, message?: string): void {
  if (signal.aborted) {
    throw new AbortError(message);
  }
}

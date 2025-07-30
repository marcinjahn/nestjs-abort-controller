/**
 * Utility function to throw if aborted with custom error
 */
export function throwIfAborted(signal: AbortSignal, message?: string): void {
  if (signal.aborted) {
    throw new Error(message || 'Operation was aborted');
  }
}

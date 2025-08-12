import { Request } from 'express';

export interface AbortControllerRequest extends Request {
  abortController?: AbortController;
  abortSignal?: AbortSignal;
}

export interface AbortControllerOptions {
  timeout?: number; // Timeout duration in milliseconds (default: 30000ms = 30 seconds)
  enableLogging?: boolean;
}

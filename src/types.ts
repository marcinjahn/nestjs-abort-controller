import { Request } from 'express';

export interface AbortControllerRequest extends Request {
  abortController?: AbortController;
  abortSignal?: AbortSignal;
}

export interface AbortControllerOptions {
  timeout?: number;
  enableLogging?: boolean;
}

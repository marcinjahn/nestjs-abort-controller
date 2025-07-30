import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AbortControllerOptions, AbortControllerRequest } from './types';

const LOG_MESSAGES = {
  CLIENT_DISCONNECTED: 'Client disconnected, aborting request',
  REQUEST_TIMEOUT: 'Request timeout after {timeout}ms',
  REQUEST_COMPLETED: 'Request completed successfully',
} as const;

@Injectable()
export class AbortControllerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AbortControllerMiddleware.name);
  private static options: AbortControllerOptions = {};

  static setOptions(options: AbortControllerOptions) {
    AbortControllerMiddleware.options = options;
  }

  use(req: AbortControllerRequest, res: Response, next: () => void) {
    const controller = new AbortController();

    const timeout = AbortControllerMiddleware.options.timeout ?? 30000;
    const enableLogging = AbortControllerMiddleware.options.enableLogging ?? false;

    req.abortController = controller;
    req.abortSignal = controller.signal;

    req.on('close', () => {
      if (enableLogging) {
        this.logger.debug(LOG_MESSAGES.CLIENT_DISCONNECTED);
      }
      controller.abort();
    });

    if (timeout > 0) {
      const timeoutId = setTimeout(() => {
        if (enableLogging) {
          this.logger.warn(LOG_MESSAGES.REQUEST_TIMEOUT.replace('{timeout}', timeout.toString()));
        }
        controller.abort();
      }, timeout);

      req.on('close', () => clearTimeout(timeoutId));
      res.on('finish', () => clearTimeout(timeoutId));
    }

    res.on('finish', () => {
      if (enableLogging) {
        this.logger.debug(LOG_MESSAGES.REQUEST_COMPLETED);
      }
    });

    next();
  }
}

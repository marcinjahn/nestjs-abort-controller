import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const NestAbortSignal = createParamDecorator((_, ctx: ExecutionContext): AbortSignal => {
  const req = ctx.switchToHttp().getRequest();
  return req.abortSignal;
});

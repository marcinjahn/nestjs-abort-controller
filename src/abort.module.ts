import { Module, MiddlewareConsumer, NestModule, DynamicModule } from '@nestjs/common';
import { AbortControllerMiddleware } from './abort-controller.middleware';
import { AbortControllerOptions } from './types';

@Module({
  providers: [AbortControllerMiddleware],
})
export class AbortControllerModule implements NestModule {
  private static routes: string | string[] = '*';

  configure(consumer: MiddlewareConsumer) {
    const routes = AbortControllerModule.routes;
    if (Array.isArray(routes)) {
      consumer.apply(AbortControllerMiddleware).forRoutes(...routes);
    } else {
      consumer.apply(AbortControllerMiddleware).forRoutes(routes);
    }
  }

  static forRoot(options?: AbortControllerOptions): DynamicModule {
    AbortControllerModule.routes = '*';
    AbortControllerMiddleware.setOptions(options || {});

    return {
      module: AbortControllerModule,
    };
  }

  static forRoutes(routes: string | string[] = '*', options?: AbortControllerOptions): DynamicModule {
    AbortControllerModule.routes = routes;
    AbortControllerMiddleware.setOptions(options || {});

    return {
      module: AbortControllerModule,
    };
  }
}

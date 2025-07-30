import { AbortControllerModule } from '../src/abort.module';

describe('AbortControllerModule', () => {
  it('should return dynamic module from forRoot', () => {
    const mod = AbortControllerModule.forRoot({ timeout: 123, enableLogging: true });
    expect(mod).toHaveProperty('module', AbortControllerModule);
  });

  it('should return dynamic module from forRoutes', () => {
    const mod = AbortControllerModule.forRoutes('/api', { timeout: 456 });
    expect(mod).toHaveProperty('module', AbortControllerModule);
  });
});

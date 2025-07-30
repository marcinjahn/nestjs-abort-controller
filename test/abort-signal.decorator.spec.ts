import { NestAbortSignal } from '../src/abort-signal.decorator';

describe('NestAbortSignal', () => {
  it('should be a function (Nest param decorator)', () => {
    expect(typeof NestAbortSignal).toBe('function');
  });
});

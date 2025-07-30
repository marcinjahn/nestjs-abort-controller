import { 
  throwIfAborted, 
  AbortError
} from '../src/throw-if-aborted';

describe('AbortError', () => {
  it('should create AbortError with default message', () => {
    const error = new AbortError();
    expect(error.message).toBe('Operation was aborted');
    expect(error.name).toBe('AbortError');
  });

  it('should create AbortError with custom message', () => {
    const error = new AbortError('Custom abort message');
    expect(error.message).toBe('Custom abort message');
    expect(error.name).toBe('AbortError');
  });
});

describe('throwIfAborted', () => {
  it('should not throw when signal is not aborted', () => {
    const controller = new AbortController();
    expect(() => throwIfAborted(controller.signal)).not.toThrow();
  });

  it('should throw AbortError when signal is aborted', () => {
    const controller = new AbortController();
    controller.abort();
    expect(() => throwIfAborted(controller.signal)).toThrow(AbortError);
  });

  it('should throw with custom message when signal is aborted', () => {
    const controller = new AbortController();
    controller.abort();
    expect(() => throwIfAborted(controller.signal, 'Custom message')).toThrow('Custom message');
  });
});

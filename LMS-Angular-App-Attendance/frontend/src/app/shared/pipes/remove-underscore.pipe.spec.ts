import { RemoveUnderscorePipe } from './remove-underscore.pipe';

describe('RemoveUnderscorePipe', () => {
  it('create an instance', () => {
    const pipe = new RemoveUnderscorePipe();
    expect(pipe).toBeTruthy();
  });
});

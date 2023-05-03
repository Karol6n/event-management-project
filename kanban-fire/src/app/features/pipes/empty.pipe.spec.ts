import { EmptyPipe } from './empty.pipe';

describe('EmptyPipe', () => {
  const pipe = new EmptyPipe();

  describe('correctly display', () => {
    it('existing value', () => {
      expect(pipe.transform(0)).toEqual(0);
      expect(pipe.transform('test')).toEqual('test');
    });

    it('default symbol', () => {
      expect(pipe.transform(null)).toEqual('-');
      expect(pipe.transform(undefined)).toEqual('-');
      expect(pipe.transform(Number.NaN)).toEqual('-');
      expect(pipe.transform(NaN)).toEqual('-');
    });
  });
});

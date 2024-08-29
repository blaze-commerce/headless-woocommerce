import { getColumnWidth } from '@src/lib/helpers/helper';

describe('@utils/helper', () => {
  describe('getColumnWidth', () => {
    it('should return the correct tailwind class based on the span value', () => {
      const spans = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      spans.forEach((span) => {
        expect(getColumnWidth(span)).toBe(`w-${span}/12`);
      });

      expect(getColumnWidth('12')).toBe('w-full');
    });
  });
});

import { sumNumbers } from './index';

describe('sumNumbers', () => {
  it('sums numbers', () => {
    const result = sumNumbers(1, 2);

    expect(result).toBe(3);
  });
});

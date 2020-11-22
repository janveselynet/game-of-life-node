import { isCellEmpty } from './Cell';

describe('isCellEmpty', () => {
  const dataSet = [
    {
      expectedResult: false,
      cell: { organismSpecies: '1' },
    },
    {
      expectedResult: true,
      cell: { organismSpecies: null },
    },
  ];

  dataSet.forEach(test => {
    it('returns if the cell is empty or not', () => {
      const actualResult = isCellEmpty(test.cell);

      expect(actualResult).toBe(test.expectedResult);
    });
  });
});

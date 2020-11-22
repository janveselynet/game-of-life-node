import { createCellWithSpecies } from '../cell/Cell';
import { getNeighboringSpeciesCountForCell } from './Neighbours';

describe('getNeighboringSpeciesCountForCell', () => {
  const sampleNeighbours = {
    neighboringSpeciesCount: {
      // eslint-disable-next-line quote-props
      '1': 2,
      // eslint-disable-next-line quote-props
      '2': 1,
    },
  };

  const dataSet = [
    {
      expectedResult: 2,
      cellOrganismSpecies: '1',
    },
    {
      expectedResult: 1,
      cellOrganismSpecies: '2',
    },
    {
      expectedResult: 0,
      cellOrganismSpecies: '3',
    },
  ];

  dataSet.forEach(test => {
    it('returns number of neighbours of cell species', () => {
      const cell = createCellWithSpecies(test.cellOrganismSpecies);

      const actualResult = getNeighboringSpeciesCountForCell(cell, sampleNeighbours);

      expect(actualResult).toBe(test.expectedResult);
    });
  });
});

import * as array from '../utils/array';
import { emptyNeighbours, Neighbours } from '../world/neighbours/Neighbours';
import { reproductionRule } from './reproductionRule';

describe('reproductionRule', () => {
  afterAll(() => jest.clearAllMocks());

  const ruleIsApplicableDataSet = [
    {
      title: 'that is empty',
      expectedCanBeApplied: true,
      cellOrganismSpecies: null,
    },
    {
      title: 'that is not empty',
      expectedCanBeApplied: false,
      cellOrganismSpecies: '3',
    },
  ];

  ruleIsApplicableDataSet.forEach(test => {
    it(`returns properly if is applicable to cell ${test.title}`, () => {
      const cell = { organismSpecies: test.cellOrganismSpecies };

      const actualCanBeApplied = reproductionRule.isApplicable(cell, emptyNeighbours);

      expect(actualCanBeApplied).toBe(test.expectedCanBeApplied);
    });
  });

  const applyDataSet = [
    {
      title: 'cell with empty neighbours',
      expectedCellOrganismSpecies: null,
      neighbours: { neighboringSpeciesCount: {} },
    },
    {
      title: 'cell with no neighboring species of count 3',
      expectedCellOrganismSpecies: null,
      // eslint-disable-next-line quote-props
      neighbours: { neighboringSpeciesCount: { '1': 1, '2': 2, '4': 4 } } as Neighbours,
    },
    {
      title: 'cell with one neighboring species of count 3',
      expectedCellOrganismSpecies: '2',
      // eslint-disable-next-line quote-props
      neighbours: { neighboringSpeciesCount: { '1': 1, '2': 3, '4': 4 } } as Neighbours,
    },
    {
      title: 'cell with multiple neighboring species of count 3',
      expectedCellOrganismSpecies: '2',
      // eslint-disable-next-line quote-props
      neighbours: { neighboringSpeciesCount: { '1': 3, '2': 3, '4': 3 } } as Neighbours,
    },
  ];

  applyDataSet.forEach(test => {
    it(`applies rule properly to ${test.title}`, () => {
      jest.spyOn(array, 'getRandomElement').mockReturnValue('2');
      const cell = { organismSpecies: null };

      const actualCellAfterApplication = reproductionRule.apply(cell, test.neighbours);

      expect(actualCellAfterApplication.organismSpecies).toBe(test.expectedCellOrganismSpecies);
    });
  });
});

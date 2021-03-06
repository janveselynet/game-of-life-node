import { createCellWithSpecies, createEmptyCell } from '../world/cell/Cell';
import { emptyNeighbours, createNeighboursContainingOnlyOneSpecies } from '../world/neighbours/Neighbours';
import { underpopulationRule } from './underpopulationRule';

const CELL_ORGANISM_SPECIES = '3';

describe('underpopulationRule', () => {
  const dataSet = [
    {
      title: 'that is empty',
      expectedCanBeApplied: false,
      cellOrganismSpecies: null,
      neighbours: emptyNeighbours,
    },
    {
      title: 'with no neighbours of same species #1',
      expectedCanBeApplied: true,
      cellOrganismSpecies: CELL_ORGANISM_SPECIES,
      neighbours: emptyNeighbours,
    },
    {
      title: 'with no neighbours of same species #2',
      expectedCanBeApplied: true,
      cellOrganismSpecies: CELL_ORGANISM_SPECIES,
      neighbours: createNeighboursContainingOnlyOneSpecies(CELL_ORGANISM_SPECIES, 0),
    },
    {
      title: 'with 1 neighbour of same species',
      expectedCanBeApplied: true,
      cellOrganismSpecies: CELL_ORGANISM_SPECIES,
      neighbours: createNeighboursContainingOnlyOneSpecies(CELL_ORGANISM_SPECIES, 1),
    },
    {
      title: 'with 2 neighbour of same species',
      expectedCanBeApplied: false,
      cellOrganismSpecies: CELL_ORGANISM_SPECIES,
      neighbours: createNeighboursContainingOnlyOneSpecies(CELL_ORGANISM_SPECIES, 2),
    },
    {
      title: 'with 3 neighbour of same species',
      expectedCanBeApplied: false,
      cellOrganismSpecies: CELL_ORGANISM_SPECIES,
      neighbours: createNeighboursContainingOnlyOneSpecies(CELL_ORGANISM_SPECIES, 3),
    },
    {
      title: 'with 10 neighbour of same species',
      expectedCanBeApplied: false,
      cellOrganismSpecies: CELL_ORGANISM_SPECIES,
      neighbours: createNeighboursContainingOnlyOneSpecies(CELL_ORGANISM_SPECIES, 10),
    },
  ];

  dataSet.forEach(test => {
    it(`returns properly if is applicable to cell ${test.title}`, () => {
      const cell = test.cellOrganismSpecies
        ? createCellWithSpecies(test.cellOrganismSpecies)
        : createEmptyCell();

      const actualCanBeApplied = underpopulationRule.isApplicable(cell, test.neighbours);

      expect(actualCanBeApplied).toBe(test.expectedCanBeApplied);
    });
  });

  it('applies rule properly', () => {
    const cell = createCellWithSpecies(CELL_ORGANISM_SPECIES);
    const neighbours = createNeighboursContainingOnlyOneSpecies(CELL_ORGANISM_SPECIES, 1);

    const actualCellAfterApplication = underpopulationRule.apply(cell, neighbours);

    expect(actualCellAfterApplication.organismSpecies).toBeNull();
  });
});

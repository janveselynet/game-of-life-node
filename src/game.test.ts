import { reproductionRule } from './rules/reproductionRule';
import { SpeciesIdentifier } from './Species';
import { createCellWithSpecies } from './world/cell/Cell';
import { World } from './world/World';
import { runGame } from './game';
import * as worldEvolution from './world/worldEvolution';

const NUMBER_OF_ITERATIONS = 3;

describe('runGame', () => {
  afterEach(() => jest.restoreAllMocks());

  const createSampleWorld = (cellSpecies: SpeciesIdentifier): World => ({
    size: 2,
    cells: [
      [createCellWithSpecies(cellSpecies), createCellWithSpecies(cellSpecies)],
      [createCellWithSpecies(cellSpecies), createCellWithSpecies(cellSpecies)],
    ],
  });

  it('evolves world for every iteration', () => {
    const worlds = [
      createSampleWorld('1'),
      createSampleWorld('2'),
      createSampleWorld('3'),
      createSampleWorld('4'),
    ];
    const rules = [reproductionRule];

    const evolveWorldMock = jest.spyOn(worldEvolution, 'evolveWorld')
      .mockReturnValueOnce(worlds[1])
      .mockReturnValueOnce(worlds[2])
      .mockReturnValueOnce(worlds[3]);

    const finalWorld = runGame(worlds[0], rules, NUMBER_OF_ITERATIONS);

    expect(finalWorld).toBe(worlds[3]);

    expect(evolveWorldMock).toBeCalledWith(worlds[0], rules);
    expect(evolveWorldMock).toBeCalledWith(worlds[1], rules);
    expect(evolveWorldMock).toBeCalledWith(worlds[2], rules);
  });
});

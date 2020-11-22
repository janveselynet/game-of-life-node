import { createCellWithSpecies } from './cell/Cell';
import { reproductionRule } from '../rules/reproductionRule';
import { evolveWorld } from './worldEvolution';
import * as cellEvolution from './cell/cellEvolution';
import * as cellNeighbours from './cellNeighbours';
import { Neighbours } from './neighbours/Neighbours';

const WORLD_SIZE = 2;
const CELL_VECTORS = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];

describe('worldEvolution', () => {
  afterEach(() => jest.restoreAllMocks());

  it('evolves every cell in the world', () => {
    const cells = [
      [createCellWithSpecies('1'), createCellWithSpecies('2')],
      [createCellWithSpecies('3'), createCellWithSpecies('4')],
    ];
    const cellsAfterEvolution = [
      [createCellWithSpecies('5'), createCellWithSpecies('6')],
      [createCellWithSpecies('7'), createCellWithSpecies('8')],
    ];

    const evolveCellSpy = jest.spyOn(cellEvolution, 'evolveCell');
    CELL_VECTORS.forEach(cellVector => {
      evolveCellSpy.mockReturnValueOnce(cellsAfterEvolution[cellVector.y][cellVector.x]);
    });

    const neighbours: Neighbours = { neighboringSpeciesCount: {} };
    const getCellNeighboursSpy = jest.spyOn(cellNeighbours, 'getCellNeighboursFromWorld')
      .mockReturnValue(neighbours);

    const world = { size: WORLD_SIZE, cells };
    const rules = [reproductionRule];

    const evolvedWorld = evolveWorld(world, rules);

    expect(evolvedWorld.size).toBe(WORLD_SIZE);
    expect(evolvedWorld.cells).toStrictEqual(cellsAfterEvolution);

    CELL_VECTORS.forEach(cellVector => {
      expect(getCellNeighboursSpy).toBeCalledWith(world, cellVector);
      expect(evolveCellSpy).toBeCalledWith(cells[cellVector.y][cellVector.x], neighbours, rules);
    });
  });
});

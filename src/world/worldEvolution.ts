import { EvolutionRule } from '../rules/EvolutionRule';
import { World } from './World';
import { evolveCell } from './cell/cellEvolution';
import { getCellNeighboursFromWorld } from './cellNeighbours';

export const evolveWorld = (world: World, rules: Array<EvolutionRule>): World => {
  const evolvedCells = world.cells.map(
    (cellsRow, y) => cellsRow.map(
      (cell, x) => {
        const neighbours = getCellNeighboursFromWorld(world, { x, y });
        return evolveCell(cell, neighbours, rules);
      },
    ),
  );

  return { size: world.size, cells: evolvedCells };
};

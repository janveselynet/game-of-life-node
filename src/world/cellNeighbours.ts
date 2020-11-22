import { CellPosition, World } from './World';
import { Cell, isCellEmpty } from './cell/Cell';
import { NeighboringSpeciesCount, Neighbours } from './neighbours/Neighbours';
import { SpeciesIdentifier } from '../Species';

const isCellNeighbour = (cellPosition: CellPosition, neighbourPosition: CellPosition): boolean => {
  const cellX = cellPosition.x;
  const cellY = cellPosition.y;
  const neighbourX = neighbourPosition.x;
  const neighbourY = neighbourPosition.y;

  const isSameCell = neighbourX === cellX && neighbourY === cellY;
  if (isSameCell) {
    return false;
  }

  return neighbourX >= cellX - 1 && neighbourX <= cellX + 1
    && neighbourY >= cellY - 1 && neighbourY <= cellY + 1;
};

const computeNeighbouringSpeciesCount = (neighbours: Array<Cell>): NeighboringSpeciesCount => {
  const neighboringSpeciesCount: NeighboringSpeciesCount = {};
  neighbours.forEach(neighbour => {
    const organismSpecies = neighbour.organismSpecies as SpeciesIdentifier;
    neighboringSpeciesCount[organismSpecies] = neighboringSpeciesCount[organismSpecies] ?? 0;
    neighboringSpeciesCount[organismSpecies] += 1;
  });
  return neighboringSpeciesCount;
};

export const getCellNeighboursFromWorld = (world: World, cellPosition: CellPosition): Neighbours => {
  const neighbours = world.cells.map(
    (cellsRow, y) => cellsRow.filter(
      (possibleNeighbour, x) => !isCellEmpty(possibleNeighbour) && isCellNeighbour(cellPosition, { x, y }),
    ),
  );
  const flattenedNeighbours = ([] as Array<Cell>).concat(...neighbours);

  return { neighboringSpeciesCount: computeNeighbouringSpeciesCount(flattenedNeighbours) };
};

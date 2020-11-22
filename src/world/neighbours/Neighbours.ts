import { Cell } from '../cell/Cell';
import { SpeciesIdentifier } from '../../Species';

export type NeighboringSpeciesCount = Record<SpeciesIdentifier, number>;

export interface Neighbours {
  neighboringSpeciesCount: NeighboringSpeciesCount;
}

export const getNeighboringSpeciesCountForCell = (cell: Cell, neighbours: Neighbours): number => {
  if (cell.organismSpecies === null) {
    return 0;
  }

  return neighbours.neighboringSpeciesCount[cell.organismSpecies] ?? 0;
};

export const emptyNeighbours: Neighbours = { neighboringSpeciesCount: {} };

export const createNeighboursContainingOnlyOneSpecies = (
  species: SpeciesIdentifier,
  speciesCount: number,
): Neighbours => (
  { neighboringSpeciesCount: { [species]: speciesCount } }
);

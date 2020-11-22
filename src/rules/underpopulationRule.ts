import { Cell, createEmptyCell, isCellEmpty } from '../world/cell/Cell';
import { getNeighboringSpeciesCountForCell, Neighbours } from '../world/neighbours/Neighbours';
import { EvolutionRule } from './EvolutionRule';

const UNDERPOPULATION_THRESHOLD = 2;

export const underpopulationRule: EvolutionRule = {
  isApplicable: (cell: Cell, neighbours: Neighbours): boolean => (
    !isCellEmpty(cell) && getNeighboringSpeciesCountForCell(cell, neighbours) < UNDERPOPULATION_THRESHOLD
  ),

  apply: (): Cell => createEmptyCell(),
};

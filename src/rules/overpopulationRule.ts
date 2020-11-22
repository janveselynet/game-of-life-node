import { Cell, createEmptyCell, isCellEmpty } from '../world/cell/Cell';
import { getNeighboringSpeciesCountForCell, Neighbours } from '../world/neighbours/Neighbours';
import { EvolutionRule } from './EvolutionRule';

const OVERPOPULATION_THRESHOLD = 3;

export const overpopulationRule: EvolutionRule = {
  isApplicable: (cell: Cell, neighbours: Neighbours): boolean => (
    !isCellEmpty(cell) && getNeighboringSpeciesCountForCell(cell, neighbours) > OVERPOPULATION_THRESHOLD
  ),

  apply: (): Cell => createEmptyCell(),
};

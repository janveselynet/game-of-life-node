import { Cell } from '../world/cell/Cell';
import { Neighbours } from '../world/neighbours/Neighbours';

export interface EvolutionRule {
  isApplicable: (cell: Cell, neighbours: Neighbours) => boolean;
  apply: (cell: Cell, neighbours: Neighbours) => Cell;
}

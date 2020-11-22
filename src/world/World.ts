import { Cell } from './cell/Cell';

export interface World {
  size: number;
  cells: Array<Array<Cell>>;
}

export interface CellPosition {
  x: number;
  y: number;
}

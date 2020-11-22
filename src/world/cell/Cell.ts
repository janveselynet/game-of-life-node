import { SpeciesIdentifier } from '../../Species';

export interface Cell {
  organismSpecies: SpeciesIdentifier | null;
}

export const isCellEmpty = (cell: Cell): boolean => cell.organismSpecies === null;

export const createEmptyCell = (): Cell => ({ organismSpecies: null });

export const createCellWithSpecies = (species: SpeciesIdentifier): Cell => (
  { organismSpecies: species }
);

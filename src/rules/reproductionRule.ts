import { getRandomElement } from '../utils/array';
import {
  Cell,
  createCellWithSpecies,
  createEmptyCell,
  isCellEmpty,
} from '../world/cell/Cell';
import { Neighbours } from '../world/neighbours/Neighbours';
import { EvolutionRule } from './EvolutionRule';

const REPRODUCTION_THRESHOLD = 3;

export const reproductionRule: EvolutionRule = {
  isApplicable: (cell: Cell): boolean => isCellEmpty(cell),

  apply: (cell: Cell, neighbours: Neighbours): Cell => {
    const speciesThatCanReproduce = Object.keys(neighbours.neighboringSpeciesCount).filter(
      speciesIdentifier => neighbours.neighboringSpeciesCount[speciesIdentifier] === REPRODUCTION_THRESHOLD,
    );

    const noSpeciesToReproduce = speciesThatCanReproduce.length === 0;
    if (noSpeciesToReproduce) {
      return createEmptyCell();
    }

    const speciesToReproduce = getRandomElement(speciesThatCanReproduce);
    return createCellWithSpecies(speciesToReproduce);
  },
};

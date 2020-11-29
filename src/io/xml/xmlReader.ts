import { promises as fs } from 'fs';
import { parseStringPromise } from 'xml2js';
import { GameDefinition } from '../../GameDefinition';
import { Cell, createCellWithSpecies, createEmptyCell } from '../../world/cell/Cell';
import { InvalidInputError } from '../InvalidInputError';

const validateBasicWorldValues = (numberOfIterations: number, size: number): void => {
  if (numberOfIterations < 0) {
    throw new InvalidInputError('Number of iterations must be number bigger than or equal to 0.');
  }
  if (size <= 0) {
    throw new InvalidInputError('World size must be number bigger than 0.');
  }
};

const validateCellPosition = (x: number, y: number, worldSize: number): void => {
  if (x < 0 || x >= worldSize) {
    throw new InvalidInputError('Cell x position must be number between 0 and world size.');
  }
  if (y < 0 || y >= worldSize) {
    throw new InvalidInputError('Cell y position must be number between 0 and world size.');
  }
};

const createGameDefinitionFromParsedData = (parsedData: any): GameDefinition => {
  const numberOfIterations = Number(parsedData.life.world[0].iterations[0]);
  const size = Number(parsedData.life.world[0].cells[0]);
  validateBasicWorldValues(numberOfIterations, size);

  const cells: Cell[][] = [];
  for (let y = 0; y < size; y++) {
    cells[y] = [];
    for (let x = 0; x < size; x++) {
      cells[y][x] = createEmptyCell();
    }
  }
  parsedData.life.organisms[0].organism.forEach((organism: any) => {
    const x = Number(organism.x_pos[0]);
    const y = Number(organism.y_pos[0]);
    validateCellPosition(x, y, size);

    const species = String(organism.species[0]);
    cells[y][x] = createCellWithSpecies(species);
  });

  return {
    initialWorld: { size, cells },
    numberOfIterations,
  };
};

export const readGameDefinitionFromXml = async (filePath: string): Promise<GameDefinition> => {
  let dataFromFile;
  let parsedData;

  try {
    dataFromFile = await fs.readFile(filePath);
    parsedData = await parseStringPromise(dataFromFile);
  } catch (error) {
    throw new InvalidInputError('Cannot read or parsed input file.');
  }

  try {
    return createGameDefinitionFromParsedData(parsedData);
  } catch (error) {
    if (error instanceof InvalidInputError) {
      throw error;
    }
    throw new InvalidInputError('Invalid xml structure.');
  }
};

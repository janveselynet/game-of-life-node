import { promises as fs } from 'fs';
import { parseStringPromise } from 'xml2js';
import { GameDefinition } from '../../GameDefinition';
import { Cell, createCellWithSpecies, createEmptyCell } from '../../world/cell/Cell';

const createGameDefinitionFromParsedData = (parsedData: any): GameDefinition => {
  const numberOfIterations = Number(parsedData.life.world[0].iterations[0]);
  const size = Number(parsedData.life.world[0].cells[0]);

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
    const species = String(organism.species[0]);
    cells[y][x] = createCellWithSpecies(species);
  });

  return {
    initialWorld: { size, cells },
    numberOfIterations,
  };
};

export const readGameDefinitionFromXml = async (filePath: string): Promise<GameDefinition> => {
  const data = await fs.readFile(filePath);
  const parsedData = await parseStringPromise(data);
  return createGameDefinitionFromParsedData(parsedData);
};

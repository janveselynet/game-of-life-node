import { promises as fs } from 'fs';
import xml2js from 'xml2js';
import { isCellEmpty } from '../../world/cell/Cell';
import { World } from '../../world/World';

const createOutputInJson = (world: World): Record<string, unknown> => {
  const organisms: Record<string, unknown>[] = [];
  world.cells.forEach((cellRow, y) => {
    cellRow.forEach((cell, x) => {
      if (!isCellEmpty(cell)) {
        organisms.push({
          x_pos: x,
          y_pos: y,
          species: cell.organismSpecies,
        });
      }
    });
  });

  return {
    life: {
      world: {
        cells: world.size,
      },
      organisms: {
        organism: organisms,
      },
    },
  };
};

export const writeWorldToXml = async (world: World, filePath: string): Promise<void> => {
  const output = createOutputInJson(world);

  const xmlBuilder = new xml2js.Builder();
  const xml = xmlBuilder.buildObject(output);

  await fs.writeFile(filePath, xml);
};

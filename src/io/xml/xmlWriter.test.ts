import path from 'path';
import { promises as fs } from 'fs';
import { createCellWithSpecies, createEmptyCell } from '../../world/cell/Cell';
import { writeWorldToXml } from './xmlWriter';

describe('xmlWriter', () => {
  it('writes world into xml file', async () => {
    const OUTPUT_FILE = path.join(__dirname, '__fixtures__', 'out.xml');
    const EXPECTED_OUTPUT_FILE = path.join(__dirname, '__fixtures__', 'expectedXmlOutput.xml');

    const sampleWorld = {
      size: 2,
      cells: [
        [createCellWithSpecies('1'), createCellWithSpecies('2')],
        [createEmptyCell(), createCellWithSpecies('3')],
      ],
    };

    await writeWorldToXml(sampleWorld, OUTPUT_FILE);

    const actualXml = await fs.readFile(OUTPUT_FILE);
    const expectedXml = await fs.readFile(EXPECTED_OUTPUT_FILE);

    expect(actualXml).toEqual(expectedXml);
  });
});

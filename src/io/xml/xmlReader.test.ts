import path from 'path';
import { readGameDefinitionFromXml } from './xmlReader';

describe('xmlReader', () => {
  it('reads xml file with game definition', async () => {
    const INPUT_FILE = path.join(__dirname, '__fixtures__', 'xmlInput.xml');

    const gameDefinition = await readGameDefinitionFromXml(INPUT_FILE);

    expect(gameDefinition.numberOfIterations).toBe(4);
    expect(gameDefinition.initialWorld.size).toBe(2);

    expect(gameDefinition.initialWorld.cells[0][0].organismSpecies).toBe('1');
    expect(gameDefinition.initialWorld.cells[0][1].organismSpecies).toBe('2');
    expect(gameDefinition.initialWorld.cells[1][0].organismSpecies).toBe(null);
    expect(gameDefinition.initialWorld.cells[1][1].organismSpecies).toBe('3');
  });
});

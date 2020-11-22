import path from 'path';
import { promises as fs } from 'fs';
import { readGameDefinitionFromXml } from '../src/io/xml/xmlReader';
import { runGame } from '../src/game';
import { overpopulationRule } from '../src/rules/overpopulationRule';
import { reproductionRule } from '../src/rules/reproductionRule';
import { underpopulationRule } from '../src/rules/underpopulationRule';
import { writeWorldToXml } from '../src/io/xml/xmlWriter';

describe('Game of Life', () => {
  const OUTPUT_FILE = path.join(__dirname, '__fixtures__', 'out.xml');

  const scenarioProvider = [
    { dir: 'scenario-1' },
    { dir: 'scenario-2' },
    { dir: 'scenario-3' },
    { dir: 'scenario-4' },
    { dir: 'scenario-5' },
    { dir: 'scenario-6' },
    { dir: 'scenario-7' },
    { dir: 'scenario-8' },
    { dir: 'scenario-9' },
  ];

  scenarioProvider.forEach(test => {
    it(`is working as expected in scenario ${test.dir}`, async () => {
      const inputFile = path.join(__dirname, '__fixtures__', test.dir, 'input.xml');
      const expectedOutputFile = path.join(__dirname, '__fixtures__', test.dir, 'output.xml');

      const rules = [
        underpopulationRule,
        overpopulationRule,
        reproductionRule,
      ];

      const gameDefinition = await readGameDefinitionFromXml(inputFile);
      const finalWorld = runGame(gameDefinition, rules);
      await writeWorldToXml(finalWorld, OUTPUT_FILE);

      const actualXml = await fs.readFile(OUTPUT_FILE);
      const expectedXml = await fs.readFile(expectedOutputFile);
      expect(actualXml).toEqual(expectedXml);
    });
  });
});

import path from 'path';
import yargs from 'yargs';
import { runGame } from './game';
import { readGameDefinitionFromXml } from './io/xml/xmlReader';
import { writeWorldToXml } from './io/xml/xmlWriter';
import { overpopulationRule } from './rules/overpopulationRule';
import { reproductionRule } from './rules/reproductionRule';
import { underpopulationRule } from './rules/underpopulationRule';

const DEFAULT_OUTPUT_FILE = path.join(__dirname, '..', 'output.xml');

const rules = [
  underpopulationRule,
  overpopulationRule,
  reproductionRule,
];

const options = yargs
  .usage('Usage: -i <inputFile> [-o <outputFile>]')
  .option(
    'input',
    {
      alias: 'i',
      describe: 'Input file',
      type: 'string',
      demandOption: true,
    },
  )
  .option(
    'output',
    {
      alias: 'o',
      describe: 'Output file',
      type: 'string',
    },
  )
  .argv;

(async () => {
  const gameDefinition = await readGameDefinitionFromXml(options.input);

  const worldAfterEvolution = runGame(gameDefinition, rules);

  const outputFile = options.output || DEFAULT_OUTPUT_FILE;
  await writeWorldToXml(worldAfterEvolution, outputFile);
})();

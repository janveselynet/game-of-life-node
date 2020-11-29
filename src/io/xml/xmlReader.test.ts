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

  const invalidInputProvider = [
    {
      title: 'non-existent file',
      fileName: 'invalidInputNonExistentFile.xml',
      expectedErrorMessage: 'Cannot read or parsed input file.',
    },
    {
      title: 'invalid xml file',
      fileName: 'invalidInputInvalidXml.xml',
      expectedErrorMessage: 'Cannot read or parsed input file.',
    },
    {
      title: 'invalid xml structure',
      fileName: 'invalidInputInvalidXmlStructure.xml',
      expectedErrorMessage: 'Invalid xml structure.',
    },
    {
      title: 'negative number of iterations',
      fileName: 'invalidInputNegativeNumberOfIterations.xml',
      expectedErrorMessage: 'Number of iterations must be number bigger than or equal to 0.',
    },
    {
      title: 'negative world size',
      fileName: 'invalidInputNegativeSize.xml',
      expectedErrorMessage: 'World size must be number bigger than 0.',
    },
    {
      title: 'zero world size',
      fileName: 'invalidInputZeroSize.xml',
      expectedErrorMessage: 'World size must be number bigger than 0.',
    },
    {
      title: 'negative cell x position',
      fileName: 'invalidInputNegativeXPosition.xml',
      expectedErrorMessage: 'Cell x position must be number between 0 and world size.',
    },
    {
      title: 'cell x position bigger than size',
      fileName: 'invalidInputXPositionBiggerThanSize.xml',
      expectedErrorMessage: 'Cell x position must be number between 0 and world size.',
    },
    {
      title: 'negative cell y position',
      fileName: 'invalidInputNegativeYPosition.xml',
      expectedErrorMessage: 'Cell y position must be number between 0 and world size.',
    },
    {
      title: 'cell y position bigger than size',
      fileName: 'invalidInputYPositionBiggerThanSize.xml',
      expectedErrorMessage: 'Cell y position must be number between 0 and world size.',
    },
  ];

  invalidInputProvider.forEach(test => {
    it(`throws error on ${test.title}`, async () => {
      const inputFile = path.join(__dirname, '__fixtures__', test.fileName);
      expect.assertions(1);

      try {
        await readGameDefinitionFromXml(inputFile);
      } catch (error) {
        expect(error.message).toEqual(test.expectedErrorMessage);
      }
    });
  });
});

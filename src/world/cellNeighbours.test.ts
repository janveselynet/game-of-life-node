import { createCellWithSpecies, createEmptyCell } from './cell/Cell';
import { getCellNeighboursFromWorld } from './cellNeighbours';
import { Neighbours } from './neighbours/Neighbours';

describe('cellNeighbours', () => {
  const sampleWorld = {
    size: 4,
    cells: [
      [
        createCellWithSpecies('1'),
        createCellWithSpecies('2'),
        createEmptyCell(),
        createCellWithSpecies('1'),
      ],
      [
        createCellWithSpecies('2'),
        createEmptyCell(),
        createCellWithSpecies('1'),
        createCellWithSpecies('3'),
      ],
      [
        createCellWithSpecies('1'),
        createCellWithSpecies('1'),
        createCellWithSpecies('1'),
        createCellWithSpecies('1'),
      ],
      [
        createCellWithSpecies('2'),
        createCellWithSpecies('2'),
        createCellWithSpecies('1'),
        createEmptyCell(),
      ],
    ],
  };

  const cellNeighboursProvider = [
    {
      title: 'x=0, y=0',
      cellPosition: { x: 0, y: 0 },
      expectedNeighbours: <Neighbours>{
        // eslint-disable-next-line quote-props
        neighboringSpeciesCount: { '2': 2 },
      },
    },
    {
      title: 'x=3, y=0',
      cellPosition: { x: 3, y: 0 },
      expectedNeighbours: <Neighbours>{
        // eslint-disable-next-line quote-props
        neighboringSpeciesCount: { '1': 1, '3': 1 },
      },
    },
    {
      title: 'x=1, y=1',
      cellPosition: { x: 1, y: 1 },
      expectedNeighbours: <Neighbours>{
        // eslint-disable-next-line quote-props
        neighboringSpeciesCount: { '1': 5, '2': 2 },
      },
    },
    {
      title: 'x=2, y=1',
      cellPosition: { x: 2, y: 1 },
      expectedNeighbours: <Neighbours>{
        // eslint-disable-next-line quote-props
        neighboringSpeciesCount: { '1': 4, '2': 1, '3': 1 },
      },
    },
    {
      title: 'x=1, y=2',
      cellPosition: { x: 1, y: 2 },
      expectedNeighbours: <Neighbours>{
        // eslint-disable-next-line quote-props
        neighboringSpeciesCount: { '1': 4, '2': 3 },
      },
    },
    {
      title: 'x=2, y=2',
      cellPosition: { x: 2, y: 2 },
      expectedNeighbours: <Neighbours>{
        // eslint-disable-next-line quote-props
        neighboringSpeciesCount: { '1': 4, '2': 1, '3': 1 },
      },
    },
    {
      title: 'x=0, y=3',
      cellPosition: { x: 0, y: 3 },
      expectedNeighbours: <Neighbours>{
        // eslint-disable-next-line quote-props
        neighboringSpeciesCount: { '1': 2, '2': 1 },
      },
    },
    {
      title: 'x=3, y=3',
      cellPosition: { x: 3, y: 3 },
      expectedNeighbours: <Neighbours>{
        // eslint-disable-next-line quote-props
        neighboringSpeciesCount: { '1': 3 },
      },
    },
  ];

  cellNeighboursProvider.forEach(test => {
    it(`resolves neighbours correctly for cell ${test.title}`, () => {
      const actualNeighbours = getCellNeighboursFromWorld(sampleWorld, test.cellPosition);

      expect(actualNeighbours).toStrictEqual(test.expectedNeighbours);
    });
  });
});

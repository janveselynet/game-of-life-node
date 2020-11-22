import { EvolutionRule } from '../../rules/EvolutionRule';
import { Neighbours } from '../neighbours/Neighbours';
import { Cell } from './Cell';
import { evolveCell } from './cellEvolution';

describe('evolveCell', () => {
  const originalCell: Cell = { organismSpecies: '1' };
  const neighbours: Neighbours = { neighboringSpeciesCount: {} };
  const expectedCellAfterRuleApplication: Cell = { organismSpecies: '2' };

  const createRuleMock = (isApplicable: boolean): EvolutionRule => ({
    isApplicable: jest.fn().mockReturnValue(isApplicable),
    apply: () => expectedCellAfterRuleApplication,
  });

  it('applies first applicable rule', () => {
    const rules = [
      createRuleMock(false),
      createRuleMock(true),
      createRuleMock(true),
    ];

    const actualCellAfterRuleApplication = evolveCell(originalCell, neighbours, rules);

    expect(actualCellAfterRuleApplication).toBe(expectedCellAfterRuleApplication);
    expect(rules[0].isApplicable).toBeCalledWith(originalCell, neighbours);
    expect(rules[1].isApplicable).toBeCalledWith(originalCell, neighbours);
    expect(rules[2].isApplicable).not.toBeCalled();
  });

  it('returns original cell if no rule is applicable', () => {
    const rules = [
      createRuleMock(false),
      createRuleMock(false),
      createRuleMock(false),
    ];

    const actualCellAfterRuleApplication = evolveCell(originalCell, neighbours, rules);

    expect(actualCellAfterRuleApplication).toBe(originalCell);
    expect(rules[0].isApplicable).toBeCalledWith(originalCell, neighbours);
    expect(rules[1].isApplicable).toBeCalledWith(originalCell, neighbours);
    expect(rules[2].isApplicable).toBeCalledWith(originalCell, neighbours);
  });
});

import { Cell } from './Cell';
import { Neighbours } from '../neighbours/Neighbours';
import { EvolutionRule } from '../../rules/EvolutionRule';

export const evolveCell = (cell: Cell, neighbours: Neighbours, rules: Array<EvolutionRule>): Cell => {
  const ruleToApply = rules.find(rule => rule.isApplicable(cell, neighbours));
  return ruleToApply ? ruleToApply.apply(cell, neighbours) : cell;
};

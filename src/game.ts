import { evolveWorld } from './world/worldEvolution';
import { EvolutionRule } from './rules/EvolutionRule';
import { World } from './world/World';
import { GameDefinition } from './GameDefinition';

export const runGame = (gameDefinition: GameDefinition, rules: Array<EvolutionRule>): World => {
  let world = gameDefinition.initialWorld;
  for (let iteration = 0; iteration < gameDefinition.numberOfIterations; iteration++) {
    world = evolveWorld(world, rules);
  }
  return world;
};

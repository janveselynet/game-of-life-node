import { evolveWorld } from './world/worldEvolution';
import { EvolutionRule } from './rules/EvolutionRule';
import { World } from './world/World';

export const runGame = (initialWorld: World, rules: Array<EvolutionRule>, numberOfIterations: number): World => {
  let world = initialWorld;
  for (let iteration = 0; iteration < numberOfIterations; iteration++) {
    world = evolveWorld(world, rules);
  }
  return world;
};

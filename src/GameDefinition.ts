import { World } from './world/World';

export interface GameDefinition {
  initialWorld: World;
  numberOfIterations: number;
}

/** Register application tools here to expose them in the host UI. */
import { ToolRegistry } from '../core';
import { addCube } from './addCube';
import { addSphere } from './addSphere';
import { addCylinder } from './addCylinder';
export function createTools(): ToolRegistry {
  const registry = new ToolRegistry();
  registry.register(addCube);
  registry.register(addSphere);
  registry.register(addCylinder);
  return registry;
}

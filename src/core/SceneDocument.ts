/** Observable model collection independent of React, DOM, and WebGL. */
import { Group, Object3D } from 'three';
export class SceneDocument {
  readonly root = new Group();
  private listeners = new Set<() => void>();
  get objects(): readonly Object3D[] { return [...this.root.children]; }
  add(object: Object3D): void {
    if (object === this.root || object.getObjectById(this.root.id)) throw new Error('Scene hierarchy cycle');
    if (object.parent) throw new Error('Object already has a parent');
    this.root.add(object);
    this.notify();
  }
  // Removal transfers resource ownership back to the caller.
  remove(id: string): Object3D | undefined {
    const object = this.root.children.find(item => item.uuid === id);
    if (!object) return undefined;
    this.root.remove(object);
    this.notify();
    return object;
  }
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }
  private notify(): void { for (const listener of [...this.listeners]) listener(); }
}

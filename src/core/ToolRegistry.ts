/** Typed synchronous tool registration and execution for any host UI. */
import type { SceneDocument } from './SceneDocument';
export interface ToolContext { readonly document: SceneDocument; }
export interface ToolDefinition {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly category?: string;
  run(context: ToolContext): void;
}
export class ToolRegistry {
  private tools = new Map<string, ToolDefinition>();
  register(tool: ToolDefinition): () => void {
    if (!tool.id.trim()) throw new Error('Tool id is required');
    if (this.tools.has(tool.id)) throw new Error(`Duplicate tool: ${tool.id}`);
    const registered = { ...tool };
    this.tools.set(tool.id, registered);
    return () => { if (this.tools.get(registered.id) === registered) this.tools.delete(registered.id); };
  }
  get entries(): readonly ToolDefinition[] { return [...this.tools.values()].map(tool => ({ ...tool })); }
  execute(id: string, context: ToolContext): void {
    const tool = this.tools.get(id);
    if (!tool) throw new Error(`Unknown tool: ${id}`);
    tool.run(context);
  }
}

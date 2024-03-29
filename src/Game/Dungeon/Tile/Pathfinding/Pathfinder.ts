import { IGraph, IGraphNode } from '@/Game';
import { PriorityQueue } from '@/Utils/Queue/Queue';

export class Pathfinder {
  constructor(
    private readonly _graph: IGraph,
    private readonly _heuristic: (a: IGraphNode, b: IGraphNode) => number,
  ) {}

  public CalculatePath(from: IGraphNode, to: IGraphNode): IGraphNode[] {
    const path: IGraphNode[] = [];
    let current: IGraphNode | null = to;
    const cameFrom = this.GetCameFrom(from, to);
    while (current && current !== from) {
      path.push(current);
      current = cameFrom[current.Position.ToString()];
    }
    path.reverse();
    return path;
  }

  private GetCameFrom(
    start: IGraphNode,
    goal: IGraphNode,
  ): Record<string, IGraphNode | null> {
    const cameFrom: Record<string, IGraphNode | null> = {
      [start.Position.ToString()]: null,
    };
    const costSoFar: Record<string, number> = {
      [start.Position.ToString()]: 0,
    };
    const frontier = new PriorityQueue<IGraphNode>();
    frontier.Enqueue(start, 0);
    while (!frontier.IsEmpty) {
      const current = frontier.Dequeue();
      if (current === goal) break;
      for (const next of this._graph.GetNeighborsOf(current)) {
        const newCost =
          costSoFar[current.Position.ToString()] +
          this._graph.GetCost(current, next);
        const nextStr = next.Position.ToString();
        if (
          typeof costSoFar[nextStr] === 'undefined' ||
          newCost < costSoFar[nextStr]
        ) {
          const priority = newCost + this._heuristic(goal, next);
          costSoFar[nextStr] = newCost;
          frontier.Enqueue(next, priority);
          cameFrom[nextStr] = current;
        }
      }
    }
    return cameFrom;
  }
}

import { IGraphNode } from '@/Game';

export interface IGraph {
  GetCost(a: IGraphNode, b: IGraphNode): number;

  GetNeighborsOf(node: IGraphNode): IGraphNode[];
}

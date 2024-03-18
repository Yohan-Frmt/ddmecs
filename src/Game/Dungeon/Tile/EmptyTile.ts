import { DrawTile } from '@/Game';
import { Coordinate } from '@/Utils';
import { Tile } from './Tile';

export class EmptyTile extends Tile {
  constructor(
    public readonly StartPosition: Coordinate,
    public readonly EndPosition: Coordinate,
    public readonly Position: Coordinate,
    public readonly Neighbours: Tile[],
  ) {
    super(StartPosition, EndPosition, Position, Neighbours);
  }

  public Initialize(): void {
    this.AddComponent(new DrawTile());
    super.Initialize();
  }
}

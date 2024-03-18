import { Coordinate } from '@/Utils';
import { Tile } from './Tile';

export class WallTile extends Tile {
  constructor(
    public readonly StartPosition: Coordinate,
    public readonly EndPosition: Coordinate,
    public readonly Position: Coordinate,
    public readonly Neighbours: Tile[],
  ) {
    super(StartPosition, EndPosition, Position, Neighbours);
  }

  public isEmpty(): boolean {
    return false;
  }

  public IsWall(): boolean {
    return true;
  }

  public Initialize(): void {
    super.Initialize();
  }
}

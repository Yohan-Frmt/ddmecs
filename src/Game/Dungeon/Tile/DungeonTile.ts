import { Tile } from '@/Game';
import { Coordinate } from '@/Utils';

export abstract class DungeonTile extends Tile {
  protected constructor(
    public readonly StartPosition: Coordinate,
    public readonly EndPosition: Coordinate,
    public readonly Position: Coordinate,
    public readonly Neighbours: Tile[],
  ) {
    super(StartPosition, EndPosition, Position, Neighbours);
  }

  public IsEmpty(): boolean {
    return false;
  }

  public IsDungeon(): boolean {
    return true;
  }

  public IsPlayable(): boolean {
    return true;
  }

  public Initialize(): void {
    super.Initialize();
  }
}

import { DrawTile, DungeonObject } from '@/Game';
import { Coordinate } from '@/Utils';
import { Entity } from '@/Utils/ECS';

export abstract class Tile extends Entity {
  public DungeonObject: DungeonObject | null = null;
  // public IsActive = false;
  // public IsInRange = false;
  // public IsOnPath = false;

  protected constructor(
    public readonly StartPosition: Coordinate,
    public readonly EndPosition: Coordinate,
    public readonly Position: Coordinate,
    public readonly Neighbours: Tile[],
  ) {
    super();
  }

  public IsEmpty(): boolean {
    return true;
  }

  public IsDungeon(): boolean {
    return false;
  }

  public IsWall(): boolean {
    return false;
  }

  public IsPlayable(): boolean {
    return false;
  }

  public IsConnected(): boolean {
    return false;
  }

  public Initialize(): void {
    this.AddComponent(new DrawTile());
    super.Initialize();
  }

  public get Center(): Coordinate {
    return new Coordinate(
      this.StartPosition.x + this.Size.x / 2,
      this.StartPosition.y + this.Size.y / 2,
    );
  }

  public get Size(): Coordinate {
    return new Coordinate(
      this.EndPosition.x - this.StartPosition.x,
      this.EndPosition.y - this.StartPosition.y,
    );
  }

  //
  // public Occupies(point: Coordinate): boolean {
  //   return !(
  //     point.x < this.StartPosition.x ||
  //     point.x > this.EndPosition.x ||
  //     point.y < this.StartPosition.y ||
  //     point.y > this.EndPosition.y
  //   );
  // }
  //
  // public FindAndSetInRange(range: number): void {
  //   if (!this.DungeonObject) this.IsInRange = true;
  //   const newRange = --range;
  //   if (newRange <= 0) return;
  //   this.Neighbors.filter(neighbor => !neighbor.DungeonObject).map(
  //     neighbor => neighbor.FindAndSetInRange(range),
  //   );
  // }
}

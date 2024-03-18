import {
  DungeonObjectDraw,
  Movement,
  MovementAnimation,
  Player,
  Tile,
} from '@/Game';
import { Coordinate } from '@/Utils';
import { Entity } from '@/Utils/ECS';

export abstract class DungeonObject extends Entity {
  private readonly _movement: Movement;

  protected constructor(
    private readonly _owner: Player,
    private readonly _tile: Tile,
  ) {
    super();
    this._movement = new MovementAnimation(this._tile);
  }

  public get Owner(): Player {
    return this._owner;
  }

  public get Tile(): Tile {
    return this._movement.Tile;
  }

  public get Position(): Coordinate | null {
    return this._movement.Position;
  }

  public get PreviousPosition(): Coordinate | null {
    return this._movement.PreviousPosition;
  }

  public Initialize(): void {
    this.AddComponent(this._movement);
    this.AddComponent(new DungeonObjectDraw());
    super.Initialize();
  }

  public IsDungeonObject(): boolean {
    return this.IsSummon() || this.IsLord();
  }

  public IsTarget(): boolean {
    return this.IsMonster() || this.IsLord();
  }

  public IsSummon(): boolean {
    return false;
  }

  public IsMonster(): boolean {
    return false;
  }

  public IsLord(): boolean {
    return false;
  }

  public IsItem(): boolean {
    return false;
  }
}

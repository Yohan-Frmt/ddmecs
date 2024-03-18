import { OldMonster, Tile } from '@/Game';
import { Coordinate } from '@/Utils';
import { IComponent } from '@/Utils/ECS';

export class Movement implements IComponent {
  public Entity: OldMonster;
  protected _tile: Tile;
  protected _previousPosition: Coordinate | null = null;
  protected _path: Tile[] = [];

  constructor(tile: Tile) {
    this._tile = tile;
  }

  public get Tile(): Tile {
    return this._tile;
  }

  public set Tile(tile: Tile) {
    this._tile = tile;
    this._tile.Monster = this.Entity;
  }

  public get PreviousPosition(): Coordinate | null {
    return this._previousPosition;
  }

  public set Path(tiles: Tile[]) {
    this._path = tiles;
  }

  public get Position(): Coordinate {
    return this.Tile.Center;
  }

  public Initialize(): void {
    this._tile.Monster = this.Entity;
  }

  public Update(delta: number): void {
    if (!this.Entity.IsActive) return;
    const next = this._path.shift();
    if (!next) {
      this.Entity.OnMoveCompleted(this._tile);
      return;
    }
    this._previousPosition = this._tile.Center;
    this.Tile.Monster = null;
    this.Tile = next;
  }
}

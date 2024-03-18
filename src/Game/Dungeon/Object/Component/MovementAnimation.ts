import { OldMonster, Tile } from '@/Game';
import { Coordinate } from '@/Utils';
import { Movement } from './Movement';

export class MovementAnimation extends Movement {
  public declare Entity: OldMonster;
  private _currentPosition: Coordinate;
  private _startPosition: Coordinate;
  private timeElapsed: number;
  private _isInProgress = false;

  public get Position(): Coordinate {
    return this._currentPosition;
  }

  constructor(tile: Tile) {
    super(tile);
    this._currentPosition = this._tile.Center;
  }

  public Update(delta: number): void {
    if (!this.Entity.IsActive) return;
    if (this._isInProgress) {
      this.Move(delta);
      return;
    }

    this._isInProgress = true;
    this._startPosition = this._tile.Center;
    this.timeElapsed = 0;
  }

  private Move(delta: number): void {
    const node = this._tile;
    const next = this._path[0];
    if (!next) {
      this._isInProgress = false;
      this.Entity.OnMoveCompleted(this._tile);
      return;
    }
    const duration = 500 / 1000;
    const targetPosition = next.Center;
    node.Monster = null;
    next.Monster = this.Entity;
    this._previousPosition = this._currentPosition;
    if (this.timeElapsed < duration) {
      this._currentPosition = Coordinate.Lerp(
        this._startPosition,
        targetPosition,
        this.timeElapsed / duration,
      );
      this.timeElapsed += delta;
      return;
    }

    this._isInProgress = false;
    this._previousPosition = this._currentPosition;
    this._currentPosition = targetPosition;
    this._tile = next;
    this._path.shift();
  }
}

import { Entity } from '@/Utils/ECS';

export class OldMonster extends Entity {
  // private readonly _movement: Movement;
  // private _isActive = false;
  //
  // constructor(private readonly _player: Player, tile: Tile) {
  //   super();
  //   this._movement = new MovementAnimation(tile);
  // }
  //
  // get Player(): Player {
  //   return this._player;
  // }
  //
  // public get IsActive(): boolean {
  //   return this._isActive;
  // }
  //
  // public set IsActive(active: boolean) {
  //   this._isActive = active;
  //   if (active) {
  //     this._movement.Tile.FindAndSetInRange(15); //TODO: CHANGE
  //   }
  // }
  //
  // public get Tile(): Tile {
  //   return this._movement.Tile;
  // }
  //
  // public get Position(): Coordinate | null {
  //   return this._movement.Position;
  // }
  //
  // public get PreviousPosition(): Coordinate | null {
  //   return this._movement.PreviousPosition;
  // }
  //
  // public Initialize(): void {
  //   this.AddComponent(this._movement);
  //   this.AddComponent(new MonsterDraw());
  //   super.Initialize();
  // }
  //
  // public Move(byPath: Tile[]): void {
  //   this._movement.Path = byPath;
  // }
  //
  // public OnMoveCompleted(tile: Tile): void {
  //   this.Tile.FindAndSetInRange(Settings.monsters.radius);
  // }
}

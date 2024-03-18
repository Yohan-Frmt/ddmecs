import { Player, Tile } from '@/Game';
import { DungeonObject } from '@/Game/Dungeon/Object/DungeonObject';

export class Lord extends DungeonObject {
  private _isActive = false;

  constructor(
    public owner: Player,
    public tile: Tile,
    private _life: number = 3,
  ) {
    super(owner, tile);
  }

  public get IsActive(): boolean {
    return this._isActive;
  }

  public set IsActive(value: boolean) {
    this._isActive = value;
  }

  public get Life(): number {
    return this._life;
  }

  public set Life(value: number) {
    this._life = value;
  }

  public IsDead(): boolean {
    return this.Life <= 0;
  }

  public IsLord(): boolean {
    return true;
  }
}

import { Player, Tile } from '@/Game';
import { DungeonObject } from '@/Game/Dungeon/Object/DungeonObject';

export abstract class Summon extends DungeonObject {
  protected constructor(public owner: Player, public tile: Tile) {
    super(owner, tile);
  }

  public IsSummon(): boolean {
    return true;
  }

  protected AddToPlayerSummonList(): void {
    this.owner.Summons.push(this);
  }

  protected RemoveFromPlayerSummonList(): void {
    this.owner.Summons.splice(this.owner.Summons.indexOf(this), 1);
  }
}

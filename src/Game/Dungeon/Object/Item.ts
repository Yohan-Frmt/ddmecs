import { Player, Tile } from '@/Game';
import { Summon } from '@/Game/Dungeon/Object/Summon';

export class Item extends Summon {
  constructor(public owner: Player, public tile: Tile) {
    super(owner, tile);
  }

  public IsItem(): boolean {
    return true;
  }

  public AddToPlayerSummonList(): void {
    super.AddToPlayerSummonList();
    this.owner.Items.push(this);
  }

  public RemoveFromPlayerSummonList(): void {
    super.RemoveFromPlayerSummonList();
    this.owner.Items.splice(this.owner.Items.indexOf(this), 1);
  }
}

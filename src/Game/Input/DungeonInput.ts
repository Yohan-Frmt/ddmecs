import { Dungeon } from '@/Game';
import { OnClick } from '@/Game/Input/OnClick';
import { Coordinate } from '@/Utils';

export class DungeonInput extends OnClick {
  public Entity: Dungeon;

  public Initialize(): void {}

  public Update(): void {}

  public ClickOn(point: Coordinate): void {
    console.log(point.ToTileCoord());
    // for (const tile of this.Entity.Tiles) {
    //   if (tile.IsInRange && tile.Occupies(point)) {
    //     this.Entity.CalcPathAndMoveActive(tile);
    //   }
    // }
  }
}

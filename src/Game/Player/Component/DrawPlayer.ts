import { Player, Team } from '@/Game';
import { CanvasLayer, Coordinate, Settings } from '@/Utils';
import { IComponent } from '@/Utils/ECS';

export class DrawPlayer implements IComponent {
  public Entity: Player;

  public Initialize(): void {
    this.Clear();
    this.AddPlayerToDom();
  }

  public Update(): void {
    this.Clear();
    this.Draw();
  }

  private Draw(): void {
    CanvasLayer.Foreground.DrawCircle(
      this.Entity.Lord.Tile.Center,
      Settings.player.default.radius,
      this.Entity.Color,
    );
  }

  private Clear(): void {
    CanvasLayer.Background.ClearRect(
      this.Entity.Lord?.Tile.StartPosition ?? new Coordinate(0, 0),
      new Coordinate(Settings.board.tile.size, Settings.board.tile.size),
    );
  }

  private AddPlayerToDom(): void {
    const div = document.createElement('div');
    div.id = 'player' + Team[this.Entity.Team];
    const x =
      this.Entity.Team === Team.A || this.Entity.Team === Team.C ? 0 : 1;
    document.body.querySelectorAll('.summary')[x]?.appendChild(div);
  }
}

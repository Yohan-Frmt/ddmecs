import { DungeonObject, Team } from '@/Game';
import { CanvasLayer, Coordinate, Settings } from '@/Utils';
import { IComponent } from '@/Utils/ECS';

export class DungeonObjectDraw implements IComponent {
  public Entity: DungeonObject;

  private get Position(): Coordinate {
    const position = this.Entity.Position;
    if (!position)
      throw new Error('Attempt to draw a ship that has no Position');
    return position;
  }

  public Initialize(): void {
    this.Clear();
  }

  public Update(): void {
    this.Clear();
    this.Draw();
  }

  private Draw(): void {
    const colors = Settings.player.team.colors;
    let color: any;
    switch (this.Entity.Owner.Team) {
      case Team.A:
        color = colors.A;
        break;
      case Team.B:
        color = colors.B;
        break;
      case Team.C:
        color = colors.C;
        break;
      case Team.D:
        color = colors.D;
        break;
      default:
        color = colors.A;
        break;
    }

    CanvasLayer.Foreground.DrawCircle(
      this.Position,
      Settings.monsters.radius,
      color,
    );
  }

  private Clear(): void {
    if (this.Entity.PreviousPosition) {
      CanvasLayer.Foreground.ClearRect(
        new Coordinate(
          this.Entity.PreviousPosition.x - Settings.board.tile.size / 2,
          this.Entity.PreviousPosition.y - Settings.board.tile.size / 2,
        ),
        new Coordinate(Settings.board.tile.size, Settings.board.tile.size),
      );
    }
    CanvasLayer.Foreground.ClearRect(
      new Coordinate(
        this.Position.x - Settings.board.tile.size / 2,
        this.Position.y - Settings.board.tile.size / 2,
      ),
      new Coordinate(Settings.board.tile.size, Settings.board.tile.size),
    );
  }
}

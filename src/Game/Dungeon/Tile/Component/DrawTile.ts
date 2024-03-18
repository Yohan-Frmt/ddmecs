import { Tile } from '@/Game';
import { CanvasLayer, Color, Coordinate, Settings } from '@/Utils';
import { IComponent } from '@/Utils/ECS';

export class DrawTile implements IComponent {
  public Entity: Tile;

  public Initialize(): void {
    this.Clear();
  }

  public Update(): void {
    this.Clear();
    this.Draw();
    this.DrawDebugInfo();
  }

  private Draw(): void {
    CanvasLayer.Background.DrawRect(
      this.Entity.StartPosition,
      this.Entity.Size,
      this.GetColor(),
    );
  }

  private GetColor(): Color {
    if (this.Entity.IsOnPath) {
      return Settings.board.color.onPath;
    }

    if (this.Entity.IsInRange) {
      return Settings.board.color.inRange;
    }

    return Settings.board.color.regular;
  }

  private DrawDebugInfo(): void {
    if (!Settings.debug) return;
    const entity = this.Entity;
    CanvasLayer.Background.DrawText(
      entity.Position.ToString(),
      new Coordinate(
        entity.StartPosition.x + 8,
        entity.StartPosition.y + 25,
      ),
      new Color(255, 0, 0, 1),
    );
    if (entity.DungeonObject) {
      CanvasLayer.Background.DrawText(
        'M',
        new Coordinate(
          entity.StartPosition.x + 15,
          entity.StartPosition.y + 10,
        ),
        new Color(255, 0, 0, 1),
      );
    } else {
      CanvasLayer.Background.ClearRect(
        new Coordinate(
          entity.StartPosition.x + 10,
          entity.StartPosition.y - 10,
        ),
        new Coordinate(25, 10),
      );
    }
  }

  private Clear(): void {
    CanvasLayer.Background.ClearRect(
      this.Entity.StartPosition,
      this.Entity.Size,
    );
  }
}

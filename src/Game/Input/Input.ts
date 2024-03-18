import { Engine } from '@/Game';
import { OnClick } from '@/Game/Input/OnClick';
import { CanvasLayer, Coordinate } from '@/Utils';
import { IComponent } from '@/Utils/ECS';

export class Input implements IComponent {
  public Entity: Engine;

  public Initialize(): void {
    document
      .getElementById('board')!
      .addEventListener('click', this.HandleClick.bind(this));
  }

  public Update(): void {}

  private HandleClick(e: MouseEvent): void {
    const point = CanvasLayer.Background.CalculateLocalPointFrom(
      new Coordinate(e.clientX, e.clientY),
    );
    if (!point) return;

    for (const entity of this.Entity.Entities) {
      if (!entity.HasComponent(OnClick)) {
        continue;
      }

      entity.GetComponent(OnClick).ClickOn(point);
    }
  }
}

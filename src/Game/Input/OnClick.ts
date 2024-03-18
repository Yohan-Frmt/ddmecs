import { Coordinate } from '@/Utils';
import { Entity, IComponent } from '@/Utils/ECS';

export abstract class OnClick implements IComponent {
  public abstract Entity: Entity | null;

  public abstract Initialize(): void;

  public abstract Update(deltaTime: number): void;

  public abstract ClickOn(point: Coordinate): void;
}

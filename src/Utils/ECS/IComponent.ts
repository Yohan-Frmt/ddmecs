import { Entity } from '@/Utils/ECS/Entity';
import { IInitializable, IUpdatable } from '@/Utils/Lifecycle';

export interface IComponent extends IUpdatable, IInitializable {
  Entity: Entity | null;
}

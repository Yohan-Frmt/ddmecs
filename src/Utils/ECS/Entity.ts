import { IComponent } from '@/Utils/ECS/IComponent';
import { IInitializable } from '@/Utils/Lifecycle/IInitializable';
import { IUpdatable } from '@/Utils/Lifecycle/IUpdatable';

// eslint-disable-next-line @typescript-eslint/ban-types
type AbstractComponent<T> = Function & { prototype: T; };
type constructor<T> =
  | AbstractComponent<T>
  | { new (...args: unknown[]): T; };

export abstract class Entity implements IUpdatable, IInitializable {
  private _components: IComponent[] = [];

  public get Components(): IComponent[] {
    return this._components;
  }

  public AddComponent(component: IComponent): boolean {
    try {
      this._components.push(component);
      component.Entity = this;
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public GetComponent<C extends IComponent>(
    constructor: constructor<C>,
  ): C {
    for (const component of this._components)
      if (component instanceof constructor) return component as C;
    throw new Error(
      `Component ${constructor.name} not found on Entity ${this.constructor.name}`,
    );
  }

  public RemoveComponent<C extends IComponent>(
    constructor: constructor<C>,
  ): void {
    for (const [idx, component] of this._components.entries()) {
      if (component instanceof constructor) {
        delete this._components[idx];
        return;
      }
    }
    throw new Error(
      `Component ${constructor.name} not found on Entity ${this.constructor.name}`,
    );
  }

  public HasComponent<C extends IComponent>(
    constructor: constructor<C>,
  ): boolean {
    for (const component of this._components)
      if (component instanceof constructor) return true;
    return false;
  }

  public Initialize(): void {
    for (const component of this._components) component.Initialize();
  }

  public Update(delta: number): void {
    for (const component of this._components) component.Update(delta);
  }
}

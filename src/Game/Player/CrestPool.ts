import { Crest, Player, Side, StatCrest } from '@/Game';
import { DrawCrestPool } from '@/Game/Player/Component/DrawCrestPool';
import { Entity, IComponent } from '@/Utils/ECS';

export class CrestPool extends Entity implements IComponent {
  public static LIMIT = 99;
  public Entity: Player;

  private _movement: number;
  private _attack: number;
  private _defense: number;
  private _magic: number;
  private _trap: number;

  constructor() {
    super();
    this.Movement = 0;
    this.Attack = 0;
    this.Defense = 0;
    this.Magic = 0;
    this.Trap = 0;
  }

  public Initialize(): void {
    this.Entity.Pool = new CrestPool();
    this.AddComponent(new DrawCrestPool());
    super.Initialize();
  }

  public Update(delta: number): void {
    super.Update(delta);
    if (delta % 1000 === 0) {
      console.table({
        movement: this.Movement,
        attack: this.Attack,
        defense: this.Defense,
        magic: this.Magic,
        trap: this.Trap,
      });
    }
  }

  //#region ACCESSOR
  public get Movement(): number {
    return this._movement;
  }

  public set Movement(value: number) {
    this._movement = value;
  }

  public get Attack(): number {
    return this._attack;
  }

  public set Attack(value: number) {
    this._attack = value;
  }

  public get Defense(): number {
    return this._defense;
  }

  public set Defense(value: number) {
    this._defense = value;
  }

  public get Magic(): number {
    return this._magic;
  }

  public set Magic(value: number) {
    this._magic = value;
  }

  public get Trap(): number {
    return this._trap;
  }

  public set Trap(value: number) {
    this._trap = value;
  }

  //#endregion

  public AddToCrestPool(side: Side): void {
    if (side.Crest.Type === 'summon') return;
    (side.Crest as StatCrest).AddToCrestPool(this, side.Multiplier);
  }

  public RemoveCrestFromPool(crest: Crest, cost: number): void {
    if (crest.Type === 'summon') return;
    (crest as StatCrest).RemoveCrestFromPool(this, crest, cost);
  }
}

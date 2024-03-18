import { IDie, Player, Tile } from '@/Game';
import { Summon } from '@/Game/Dungeon/Object/Summon';

export abstract class Monster extends Summon {
  private _canAttack = true;

  protected constructor(
    public owner: Player,
    public tile: Tile,
    public die: IDie,
  ) {
    super(owner, tile);
  }

  public get canAttack(): boolean {
    return this._canAttack;
  }

  public set canAttack(value: boolean) {
    this._canAttack = value;
  }

  public HasAdvantageAgainstSpellcaster?(): boolean;

  public HasAdvantageAgainstDragon?(): boolean;

  public HasAdvantageAgainstZombie?(): boolean;

  public HasAdvantageAgainstWarrior?(): boolean;

  public HasAdvantageAgainstBeast?(): boolean;

  public IsMonster(): boolean {
    return true;
  }

  public AddToPlayerSummonList(): void {
    super.AddToPlayerSummonList();
    this.owner.Monsters.push(this);
  }

  public RemoveFromPlayerSummonList(): void {
    super.RemoveFromPlayerSummonList();
    this.owner.Monsters.splice(this.owner.Monsters.indexOf(this), 1);
  }

  public HasTypeAdvantage(target: Monster): boolean {
    return !!target.HasTypeDisadvantage(this);
  }

  public abstract HasTypeDisadvantage(
    target: Monster,
  ): boolean | undefined;

  public IsDead(): boolean {
    return (this.die.lifepoint ?? 0) <= 0;
  }

  public GetDamage = (target: Monster): number =>
    this.HasTypeAdvantage(target)
      ? (this.die.attack ?? 0) + 10
      : this.HasTypeAdvantage(target)
      ? Math.max(...[(this.die.attack ?? 0) - 10, 0])
      : this.die.attack ?? 0;

  public AttackMonster = (target: Monster): number => {
    const damage: number = this.GetDamage(target);
    target.die.lifepoint = (target.die.lifepoint ?? 0) - damage;
    return damage;
  };

  public AttackDefenseMonster = (target: Monster): [number, Monster] => {
    const damage = this.GetDamage(target);
    const defense = target.die.defense ?? 0;
    let life = target.die.lifepoint ?? 0;
    if (damage < defense) {
      life -= defense - damage;
      target.die.lifepoint = life;
      return [defense - damage, this];
    } else if (damage >= defense) {
      life -= damage - defense;
      target.die.lifepoint = life;
      return [defense - damage, target];
    }
    return [0, this];
  };

  public AttackMonsterLord = (target: Player): void => {
    target.Lord.Life -= 1;
  };
}

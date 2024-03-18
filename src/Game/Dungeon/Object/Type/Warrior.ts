import { IDie } from '@/Game';
import { Monster } from '@/Game/Dungeon/Object/Monster';

export class Warrior extends Monster {
  constructor(public die: IDie) {
    super(die);
  }

  public HasAdvantageAgainstDragon(): boolean {
    return true;
  }

  public HasTypeDisadvantage(target: Monster): boolean {
    return !!target.HasAdvantageAgainstWarrior?.();
  }
}

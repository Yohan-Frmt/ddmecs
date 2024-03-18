import { IDie } from '@/Game';
import { Monster } from '@/Game/Dungeon/Object/Monster';

export class Beast extends Monster {
  constructor(public die: IDie) {
    super(die);
  }

  public HasAdvantageAgainstWarrior(): boolean {
    return true;
  }

  public HasTypeDisadvantage(target: Monster): boolean {
    return !!target.HasAdvantageAgainstBeast?.();
  }
}

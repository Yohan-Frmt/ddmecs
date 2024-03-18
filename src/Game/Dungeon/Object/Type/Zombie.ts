import { IDie } from '@/Game';
import { Monster } from '@/Game/Dungeon/Object/Monster';

export class Zombie extends Monster {
  constructor(public die: IDie) {
    super(die);
  }

  public HasAdvantageAgainstBeast(): boolean {
    return true;
  }

  public HasTypeDisadvantage(target: Monster): boolean {
    return !!target.HasAdvantageAgainstZombie?.();
  }
}

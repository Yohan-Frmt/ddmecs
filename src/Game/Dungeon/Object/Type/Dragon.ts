import { IDie } from '@/Game';
import { Monster } from '@/Game/Dungeon/Object/Monster';

export class Dragon extends Monster {
  constructor(public die: IDie) {
    super(die);
  }

  public HasAdvantageAgainstSpellcaster(): boolean {
    return true;
  }

  public HasTypeDisadvantage(target: Monster): boolean {
    return !!target.HasAdvantageAgainstDragon?.();
  }
}

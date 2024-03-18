import { IDie } from '@/Game';
import { Monster } from '@/Game/Dungeon/Object/Monster';

export class Spellcaster extends Monster {
  constructor(public die: IDie) {
    super(die);
  }

  public HasAdvantageAgainstZombie(): boolean {
    return true;
  }

  public HasTypeDisadvantage(target: Monster): boolean {
    return !!target.HasAdvantageAgainstSpellcaster?.();
  }
}

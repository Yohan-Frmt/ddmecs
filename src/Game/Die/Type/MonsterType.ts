import { SummonType } from '@/Game/Die/Type/SummonType';

export class MonsterType extends SummonType {
  public IsMonster(): boolean {
    return true;
  }
}

import { SummonType } from '@/Game/Die/Type/SummonType';

export class ItemType extends SummonType {
  public IsItem(): boolean {
    return true;
  }
}

import { CrestPool } from '@/Game';
import { Crest } from './Crest';

export abstract class StatCrest extends Crest {
  public AddToCrestPool(pool: CrestPool, amount: number): void {
    const x = Number(pool[this.Type as keyof CrestPool]);
    (pool[this.Type as keyof CrestPool] as number) = Math.min(
      ...[x + amount, CrestPool.LIMIT],
    );
  }

  public RemoveCrestFromPool(
    pool: CrestPool,
    crest: Crest,
    cost: number,
  ): void {
    const crestCost = Number(pool[crest.Type as keyof CrestPool]);
    if (isNaN(crestCost)) throw Error('Invalid crest name');
    if (crestCost < cost) throw Error('Not Enough crests');
    (pool[crest.Type as keyof CrestPool] as number) -= cost;
  }
}

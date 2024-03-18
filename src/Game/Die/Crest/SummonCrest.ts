import { Crest } from './Crest';

export class SummonCrest extends Crest {
  constructor() {
    super();
    this.Type = 'Summon';
  }

  public isSummon(): boolean {
    return true;
  }
}

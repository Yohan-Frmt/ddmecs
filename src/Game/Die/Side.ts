import { StatCrest, SummonCrest } from '@/Game';
import { Settings } from '@/Utils';

type TSide = 'A' | 'D' | 'G' | 'M' | 'S' | 'T';
type TCrest = StatCrest | SummonCrest;

export interface ISideObject {
  crest: string;
  multiplier: number;
}

export class Side {
  private readonly _multiplier: number;
  private readonly _crest: TCrest;
  private _side: string;

  constructor(side: string) {
    const [crest, multiplier] = side;
    this._crest = new Settings.dice.crests[crest as TSide]();
    if (side.length > 1) {
      this._multiplier = parseInt(multiplier, 10);
    } else {
      this._multiplier = 1;
    }
    this._side = side;
  }

  public get Side(): string {
    return this._side;
  }

  public set Side(value: string) {
    this._side = value;
  }

  public get Multiplier(): number {
    return this._multiplier;
  }

  public get Crest(): TCrest {
    return this._crest;
  }

  public ToObject = (): ISideObject => ({
    crest: this.Crest.Type,
    multiplier: this.Multiplier,
  });
}

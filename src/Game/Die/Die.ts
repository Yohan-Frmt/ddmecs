import { IDie } from '@/Game/Die/IDie';
import { Side } from '@/Game/Die/Side';
import { ItemType } from '@/Game/Die/Type/ItemType';
import { MonsterType } from '@/Game/Die/Type/MonsterType';
import { random, Settings } from '@/Utils';
import { Entity } from '@/Utils/ECS';

export class Die extends Entity {
  private _die: MonsterType | ItemType;
  private _sides: Side[];

  constructor(private readonly _id: string, private _data: IDie) {
    super();
  }

  public get Id(): string {
    return this._id;
  }

  get Data(): IDie {
    return this._data;
  }

  set Data(value: IDie) {
    this._data = value;
  }

  public get Die(): MonsterType | ItemType {
    return this._die;
  }

  public set Die(value: MonsterType | ItemType) {
    this._die = value;
  }

  public get Sides(): Side[] {
    return this._sides;
  }

  public set Sides(value: Side[]) {
    this._sides = value;
  }

  public Roll(): Side {
    return random(this._sides);
  }

  public Initialize(): void {
    super.Initialize();
    this.Die = this._createDie(this.Data);
    this.Sides = this._createSides(this.Data);
  }

  private _createSides = ({ crests, level }: IDie): Side[] => {
    const crestsAbbr: string[] = [...Object.keys(Settings.dice.crests)];
    const sides = [];
    for (const crest of crests) {
      if (crestsAbbr.includes(crest)) {
        sides.push(crest);
        if (crest === 'S') (sides[sides.length - 1] as string) += level;
      } else {
        (sides[sides.length - 1] as Side).Side += crest;
        continue;
      }
      sides[sides.length - 1] = new Side(
        sides[sides.length - 1] as string,
      );
    }
    return sides as Side[];
  };

  private _createDie = (die: IDie): MonsterType | ItemType => {
    if (Settings.monsters.types.includes(die.type)) {
      return new MonsterType();
    } else {
      return new ItemType();
    }
  };
}

import { Entity } from '@/Utils/ECS';

export abstract class Crest extends Entity {
  private _type: string;

  public get Type(): string {
    return this._type;
  }

  public set Type(value: string) {
    this._type = value;
  }
}

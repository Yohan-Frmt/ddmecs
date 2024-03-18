import { Coordinate } from '@/Utils';
import { Net } from './Net';

export class NetZ3 extends Net {
  constructor() {
    super();
    this.Net = [
      new Coordinate(-1, 1),
      new Coordinate(0, 1),
      new Coordinate(0, 0),
      new Coordinate(0, -1),
      new Coordinate(1, -1),
      new Coordinate(1, -2),
    ];
  }

  public static get Name(): string {
    return 'Z3';
  }
}

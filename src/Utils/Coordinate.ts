import { Settings } from '@/Utils/Globals';

export const Lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

export class Coordinate {
  constructor(public x: number, public y: number) {}

  public static Lerp(
    start: Coordinate,
    end: Coordinate,
    t: number,
  ): Coordinate {
    return new Coordinate(
      Lerp(start.x, end.x, t),
      Lerp(start.y, end.y, t),
    );
  }

  public static FromAlgebricToCoordinate(algebric: string): Coordinate {
    return new Coordinate(
      algebric.charCodeAt(0) - 97,
      parseInt(algebric.substring(1)) - 1,
    );
  }

  public static FromCoordsToAlgebric(coords: Coordinate): string {
    return String.fromCharCode(coords.x + 97) + (coords.y + 1);
  }

  public static FromString(string: string): Coordinate {
    const [x, y] = string.replace(new RegExp(/\(|\)/, 'g'), '').split(',');
    if (isNaN(Number(x)) || isNaN(Number(y)))
      throw new Error(
        `Cannot instantiate Coordinate from string ${string}`,
      );
    return new Coordinate(Number(x), Number(y));
  }

  public ToString(): string {
    return `(${this.x},${this.y})`;
  }

  public ToTileCoord(): string {
    const x =
      Math.ceil(
        this.x / (Settings.board.tile.size + Settings.board.tile.offset),
      ) - 1;
    const y =
      Math.ceil(
        this.y / (Settings.board.tile.size + Settings.board.tile.offset),
      ) - 1;
    return `(${x},${y})`;
  }

  public Translate = (offset: Coordinate): void => {
    this.y += offset.y;
    this.x += offset.x;
  };

  public TurnClockwise(): void {
    [this.y, this.x] = [-1 * this.x, this.y];
  }

  public TurnAntiClockwise(): void {
    [this.y, this.x] = [this.x, -1 * this.y];
  }

  public FlipUpsideDown(): void {
    this.y = -1 * this.y;
  }

  public FlipLeftToRight(): void {
    this.x = -1 * this.x;
  }
}

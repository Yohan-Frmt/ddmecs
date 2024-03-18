export class Color {
  constructor(
    private readonly _R: number,
    private readonly _G: number,
    private readonly _B: number,
    private readonly _A: number = 1,
  ) {}

  public ToString(): string {
    return `rgba(${this._R}, ${this._G}, ${this._B}, ${this._A})`;
  }

  public FromString(string: string): Color {
    const [r, g, b, a] = string
      .replace(new RegExp(/\(|\)|[A-Za-z]/g), '')
      .split(',')
      .map(x => Number(x));

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a))
      throw new Error('Invalid string');

    return new Color(r, g, b, a);
  }

  public get R(): number {
    return this._R;
  }

  public get G(): number {
    return this._G;
  }

  public get B(): number {
    return this._B;
  }

  public get A(): number {
    return this._A;
  }
}

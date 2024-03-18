import { Coordinate } from '@/Utils';
import { Entity } from '@/Utils/ECS';

interface ITransformation {
  [key: string]: () => void;
}

export class Net extends Entity {
  protected _net: Coordinate[];
  protected _center: Coordinate | null;
  protected _transformations: ITransformation;

  protected constructor() {
    super();
    this.Transformations = {
      TCW: this.TurnClockwise.bind(this),
      TAW: this.TurnAntiClockwise.bind(this),
      FUD: this.FlipUpsideDown.bind(this),
      FLR: this.FlipLeftToRight.bind(this),
    };
  }

  public get Center(): Coordinate | null {
    for (const coord of this.Net) {
      if (coord === new Coordinate(0, 0)) {
        return coord;
      }
    }
    return null;
  }

  public set Center(value: Coordinate | null) {
    this._center = value;
  }

  public get Transformations(): ITransformation {
    return this._transformations;
  }

  public set Transformations(value: ITransformation) {
    this._transformations = value;
  }

  public get Net(): Coordinate[] {
    return this._net;
  }

  public set Net(value: Coordinate[]) {
    this._net = value;
  }

  public Initialize(): void {
    // this.AddComponent(new DrawNet());
    super.Initialize();
  }

  public Translate(offset: Coordinate): void {
    for (const net of this.Net) {
      net.Translate(offset);
    }
  }

  public Transform(transformations: string[]): void {
    for (const transform of transformations) {
      this.Transformations[transform]();
    }
  }

  private TurnClockwise(): void {
    for (const coord of this.Net) {
      coord.TurnClockwise();
    }
  }

  private TurnAntiClockwise(): void {
    for (const coord of this.Net) {
      coord.TurnAntiClockwise();
    }
  }

  private FlipUpsideDown(): void {
    for (const coord of this.Net) {
      coord.FlipUpsideDown();
    }
  }

  private FlipLeftToRight(): void {
    for (const coord of this.Net) {
      coord.FlipLeftToRight();
    }
  }
}

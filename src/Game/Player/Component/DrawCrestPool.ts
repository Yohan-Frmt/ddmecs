import { CrestPool, Side, Team } from '@/Game';
import { IComponent } from '@/Utils/ECS';

export class DrawCrestPool implements IComponent {
  public Entity: CrestPool;
  private _team: string;
  private _crestsValues: { [key: string]: number; };

  public get Team(): string {
    return this._team;
  }

  public get CrestsValues(): { [p: string]: number; } {
    return this._crestsValues;
  }

  public set CrestsValues(value: { [p: string]: number; }) {
    this._crestsValues = value;
  }

  public Initialize(): void {
    this._team = Team[this.Entity.Entity.Team];
    this.Clear();
    this.AddCrestPoolToDom();
  }

  public Update(): void {
    const side = new Side('A2');
    this.Entity.AddToCrestPool(side);
    this.Entity.RemoveCrestFromPool(side.Crest, 1);
    this.Clear();
    this.Draw();
  }

  private Draw(): void {
    for (const crest in this.Entity) {
      const valueElement = document.querySelector(
        `#value${crest.substring(1)}${this.Team}`,
      );
      if (valueElement) {
        this.CrestsValues = {
          [crest]: Number(this.Entity[crest as keyof CrestPool]),
        };
        valueElement.innerHTML = String(this.CrestsValues[crest]);
      }
    }
  }

  private Clear(): void {
    // CanvasLayer.Background.ClearRect(
    //   this.Entity.Lord?.Tile.StartPosition ?? new Coordinate(0, 0),
    //   new Coordinate(Settings.board.tile.size, Settings.board.tile.size),
    // );
  }

  private AddCrestPoolToDom(): void {
    const crestPoolDiv = document.createElement('div');
    crestPoolDiv.id = `crestpool${this.Team}`;
    document
      .querySelector(`#player${this.Team}`)
      ?.appendChild(crestPoolDiv);
    for (let crest in this.Entity) {
      if (typeof this.Entity[crest as keyof CrestPool] !== 'number')
        continue;
      crest = crest.substring(1);
      const crestDiv = document.createElement('div');
      crestDiv.id = `crest${crest}${this.Team}`;
      const crestValue = document.createElement('span');
      crestValue.id = `value${crest}${this.Team}`;
      document.querySelector(`#${crestPoolDiv.id}`)?.appendChild(crestDiv);
      this.DrawCrestImages(crestDiv, crest);
      document.querySelector(`#${crestDiv.id}`)?.appendChild(crestValue);
    }
  }

  private DrawCrestImages(element: HTMLElement, crest: string): void {
    const image = document.createElement('img');
    image.classList.add(crest);
    image.src = `/crests/crest_${crest}.png`;
    document.querySelector(`#${element.id}`)?.appendChild(image);
  }
}

import { Canvas, Coordinate, Settings } from '@/Utils';

export class CanvasLayer {
  private static _background: Canvas;
  private static _foreground: Canvas;

  public static CreateCanvas(
    style: Partial<CSSStyleDeclaration> = { zIndex: '0' },
  ): Canvas {
    const sizeX =
      (Settings.board.tile.size + Settings.board.tile.offset) *
        Settings.board.size.x +
      Settings.board.tile.offset;
    const sizeY =
      (Settings.board.tile.size + Settings.board.tile.offset) *
        Settings.board.size.y +
      Settings.board.tile.offset;
    const canvas = new Canvas(new Coordinate(sizeX, sizeY));
    canvas.Initialize();
    canvas.SetStyle(style);
    return canvas;
  }

  public static get Background(): Canvas {
    if (!this._background) this._background = this.CreateCanvas();
    return this._background;
  }

  public static get Foreground(): Canvas {
    if (!this._foreground)
      this._foreground = this.CreateCanvas({ zIndex: '1' });
    return this._foreground;
  }
}

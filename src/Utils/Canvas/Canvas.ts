import { Color } from '@/Utils';
import { Coordinate } from '@/Utils/Coordinate';
import { IInitializable } from '@/Utils/Lifecycle';

export class Canvas implements IInitializable {
  private _element: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  constructor(private readonly _size: Coordinate) {}

  public Initialize(): void {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${this._size.x}px`);
    canvas.setAttribute('height', `${this._size.y}px`);
    document.body.querySelector('#board')!.appendChild(canvas);
    this._element = canvas;
    const context = this._element.getContext('2d');
    if (!context) throw new Error('Context identifier is not supported');
    this._context = context;
  }

  public SetStyle(style?: Partial<CSSStyleDeclaration>): void {
    if (!style) return;
    for (const key in style) {
      if (!Object.hasOwnProperty.call(style, key)) continue;
      if (!style[key]) continue;
      this._element.style[key] = style[key] as string;
    }
  }

  public DrawRect(
    position: Coordinate,
    size: Coordinate,
    color: Color,
  ): void {
    this._context.beginPath();
    this._context.fillStyle = color.ToString();
    this._context.rect(position.x, position.y, size.x, size.y);
    this._context.fill();
  }

  public ClearRect(position: Coordinate, size: Coordinate): void {
    this._context.clearRect(position.x, position.y, size.x, size.y);
  }

  public DrawCircle(
    center: Coordinate,
    radius: number,
    color: Color,
  ): void {
    this._context.beginPath();
    this._context.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this._context.fillStyle = color.ToString();
    this._context.fill();
  }

  public DrawText(
    text: string,
    position: Coordinate,
    color: Color = new Color(255, 255, 255, 1),
    fontSize = 14,
    font = 'Arial',
  ): void {
    this._context.font = `${fontSize}px ${font}`;
    this._context.fillStyle = color.ToString();
    this._context.fillText(text, position.x, position.y);
  }

  public CalculateLocalPointFrom(point: Coordinate): Coordinate | null {
    const canvasRect = this._element.getBoundingClientRect();

    const offset = {
      top:
        canvasRect.top + (scrollY || document.documentElement.scrollTop),
      left:
        canvasRect.left + (scrollX || document.documentElement.scrollLeft),
    };

    const x = point.x - offset.left;
    const y = point.y - offset.top;

    if (x < 0 || y < 0) return null;

    if (
      x > offset.left + canvasRect.width ||
      y > offset.top + canvasRect.height
    )
      return null;

    return new Coordinate(x, y);
  }
}

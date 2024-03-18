import { IDungeon, IGraph, IGraphNode, Lord, Tile } from '@/Game';
import { EmptyTile } from '@/Game/Dungeon/Tile/EmptyTile';
import { DungeonInput } from '@/Game/Input/DungeonInput';
import { Coordinate, Settings } from '@/Utils';
import { Entity } from '@/Utils/ECS';

export class Dungeon extends Entity implements IGraph {
  public static Heuristic(a: IGraphNode, b: IGraphNode): number {
    return (
      Math.abs(a.Position.x - b.Position.x) +
      Math.abs(a.Position.y - b.Position.y)
    );
  }

  private _tiles: Tile[] = [];
  // private _pathfinder = new Pathfinder(this, Dungeon.Heuristic);
  // private _currentPath: Tile[] = [];
  // private _targetNode: Tile | null = null;

  public ActiveLord: Lord | null = null;

  constructor(private readonly _dungeon: IDungeon) {
    super();
  }

  public get Dungeon(): IDungeon {
    return this._dungeon;
  }

  GetCost(a: IGraphNode, b: IGraphNode): number {
    console.log(a);
    console.log(b);
    return 1;
  }

  GetNeighborsOf(tile: Tile): Tile[] {
    return tile.Neighbours;
  }

  public get Tiles(): Tile[] {
    return this._tiles;
  }

  public Initialize(): void {
    this.AddComponent(new DungeonInput());
    super.Initialize();
    this.InitializeTiles();
    for (const node of this._tiles) node.Initialize();
  }

  public Update(delta: number): void {
    super.Update(delta);
    for (const node of this._tiles) node.Update(delta);
  }

  public InitializeTiles(): void {
    const size = Settings.board.tile.size;
    const offset = Settings.board.tile.offset;
    for (let y = 0; y < Settings.board.size.y; y++) {
      for (let x = 0; x < Settings.board.size.x; x++) {
        const start = new Coordinate(
          x * (size + offset) + offset,
          y * (size + offset) + offset,
        );
        const end = new Coordinate(start.x + size, start.y + size);
        const position = new Coordinate(x, y);
        // const top = this.Tiles.find(
        //   tile =>
        //     tile.Position.x === position.x &&
        //     tile.Position.y === position.y - 1,
        // );
        // const left = this.Tiles.find(
        //   tile =>
        //     tile.Position.x === position.x - 1 &&
        //     tile.Position.y === position.y,
        // );
        //
        const neighbors: Tile[] = [];
        const tile = new EmptyTile(start, end, position, neighbors);
        //
        // if (left) {
        //   neighbors.push(left);
        //   left.Neighbors.push(tile);
        // }
        //
        // if (top) {
        //   neighbors.push(top);
        //   top.Neighbors.push(tile);
        // }

        this._tiles.push(tile);
      }
    }
  }

  // public CalcPathAndMoveActive(tile: Tile): void {
  //   this._currentPath.forEach(item => (item.IsOnPath = false));
  //   if (!this.ActiveLord) return;
  //   if (tile === this._targetNode) {
  //     this.UnHighlightAll();
  //     // this.ActiveLord.Move([...this._currentPath]);
  //     return;
  //   }
  //   this._targetNode = tile;
  //   this._currentPath = this._pathfinder.CalculatePath(
  //     this.ActiveLord.Tile,
  //     tile,
  //   ) as Tile[];
  //   this._currentPath.forEach(item => (item.IsOnPath = true));
  // }
  //
  // private UnHighlightAll(): void {
  //   this._tiles.forEach(tile => {
  //     tile.IsInRange = false;
  //     tile.IsOnPath = false;
  //   });
  // }
}

import { CrestPool, Dungeon, Team, Tile } from '@/Game';
import { Die } from '@/Game/Die/Die';
import { Item } from '@/Game/Dungeon/Object/Item';
import { Lord } from '@/Game/Dungeon/Object/Lord';
import { Monster } from '@/Game/Dungeon/Object/Monster';
import { Summon } from '@/Game/Dungeon/Object/Summon';
import { DrawPlayer } from '@/Game/Player/Component/DrawPlayer';
import { Color, Coordinate, Settings } from '@/Utils';
import { Entity } from '@/Utils/ECS';

type T = 'A' | 'B' | 'C' | 'D';

export class Player extends Entity {
  public static DIE_LIMIT = 10;
  private _summons: Summon[] = [];
  private _monsters: Monster[] = [];
  private _items: Item[] = [];
  private _lord: Lord;
  private _pool: CrestPool;
  private _tiles: Tile[] = [];
  private _usedDice: Die[] = [];
  private _position: Coordinate;
  private _color: Color;

  constructor(
    private readonly _id: number,
    private readonly _username: string,
    private readonly _dice: Die[],
    private readonly _team: Team,
    private readonly _dungeon: Dungeon,
  ) {
    super();
  }

  //#region ACCESSOR
  public get Id(): number {
    return this._id;
  }

  public get Username(): string {
    return this._username;
  }

  public get Dice(): Die[] {
    return this._dice;
  }

  public get Team(): Team {
    return this._team;
  }

  public get Dungeon(): Dungeon {
    return this._dungeon;
  }

  public get Summons(): Summon[] {
    return this._summons;
  }

  public get Monsters(): Monster[] {
    return this._monsters;
  }

  public get Items(): Item[] {
    return this._items;
  }

  public get Lord(): Lord {
    return this._lord;
  }

  public set Lord(value: Lord) {
    this._lord = value;
  }

  public get Pool(): CrestPool {
    return this._pool;
  }

  public set Pool(value: CrestPool) {
    this._pool = value;
  }

  public get Tiles(): Tile[] {
    return this._tiles;
  }

  public get UsedDice(): Die[] {
    return this._usedDice;
  }

  public get Position(): Coordinate {
    return this._position;
  }

  public set Position(value: Coordinate) {
    this._position = value;
  }

  public get Color(): Color {
    this._color = Settings.player.team.colors[Team[this.Team] as T];
    return this._color;
  }

  public set Color(value: Color) {
    this._color = value;
  }

  //#endregion

  //#region LIFECYCLE
  public Initialize(): void {
    this.AddComponent(new DrawPlayer());
    this.AddComponent(new CrestPool());
    super.Initialize();
    this.InitializeLord();
  }

  public Update(delta: number): void {
    super.Update(delta);
    this._monsters.map(monster => monster.Update(delta));
  }

  //#endregion

  // public CreateMonster(): void {
  //   const monster = new OldMonster(this);
  //   this._monsters.push(monster);
  //   monster.Initialize();
  // }

  private InitializeLord(): void {
    const tiles = this.Dungeon.Tiles;
    const tile =
      tiles.find(
        t =>
          Coordinate.FromAlgebricToCoordinate(
            Settings.player.team.positions[Team[this.Team] as T],
          ).ToString() === t.Position.ToString(),
      ) ?? tiles[0];
    this.Lord = new Lord(this, tile);
    this.Lord.Initialize();
    if (this.Team === Team.A) {
      const activeLord = this.Lord;
      activeLord.IsActive = true;
      this.Dungeon.ActiveLord = activeLord;
    }
  }
}

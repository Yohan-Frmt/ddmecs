import { Die } from '@/Game/Die/Die';
import { IDie } from '@/Game/Die/IDie';
import { Dungeon } from '@/Game/Dungeon';
import { Input } from '@/Game/Input';
import { Player } from '@/Game/Player';
import { RollDice } from '@/Game/State/RollDice';
import { Settings } from '@/Utils';
import { Entity } from '@/Utils/ECS';

export interface IDungeon {
  [key: string]: string;
}

export class Engine extends Entity {
  private _timestamp = 0;
  private _entities: Entity[] = [];
  private _monsterDictionary: Die[] = [];
  private _dungeon: Dungeon;
  private _players: Player[] = [];

  constructor(
    private readonly _dungeonMap: IDungeon,
    private readonly _playersData: { pool: number[]; username: string; }[],
  ) {
    super();
    this.Dungeon = new Dungeon(this.DungeonMap);
    for (const { username, pool } of this.PlayersData) {
      this.Players.push(
        new Player(
          this.Players.length,
          username,
          this.CreateDiePool(pool),
          this.Players.length,
          this.Dungeon,
        ),
      );
    }
    this._entities.push(this.Dungeon, ...this.Players);
  }

  public get Entities(): Entity[] {
    return this._entities;
  }

  public get DungeonMap(): IDungeon {
    return this._dungeonMap;
  }

  public get PlayersData(): { pool: number[]; username: string; }[] {
    return this._playersData;
  }

  public get Dungeon(): Dungeon {
    return this._dungeon;
  }

  public set Dungeon(value: Dungeon) {
    this._dungeon = value;
  }

  public get Players(): Player[] {
    return this._players;
  }

  public Initialize(): void {
    super.Initialize();
    this.AddComponent(new Input());
    this.AddComponent(new RollDice(this.Dungeon, this.Players));
    this.CreateMonsterDictionary(Settings.monsters.data);
    for (const entity of this._entities) entity.Initialize();
    requestAnimationFrame(() => {
      this._timestamp = Date.now();
      this.Update();
    });
  }

  public Update(): void {
    const delta = (Date.now() - this._timestamp) / 1000;
    super.Update(delta);
    for (const entity of this._entities) entity.Update(delta);
    this._timestamp = Date.now();
    requestAnimationFrame(() => this.Update());
  }

  private CreateMonsterDictionary(dict: { [key: string]: IDie; }): void {
    for (const [key, value] of Object.entries(dict)) {
      this._monsterDictionary[parseInt(key, 10) - 1] = new Die(
        key,
        value as IDie,
      );
    }
  }

  private CreateDiePool(pool: number[]): Die[] {
    return [...this._monsterDictionary].filter((die: Die) =>
      pool.includes(parseInt(die.Id, 10)),
    );
  }
}

import { Dungeon, Engine, Player } from '@/Game';
import { ICommand } from '@/Game/State/ICommand';
import { IReply } from '@/Game/State/IReply';
import { IComponent } from '@/Utils/ECS';

export abstract class State implements IComponent {
  public Entity: Engine;
  protected _player: Player;
  protected _opponents: Player[];
  protected _reply: IReply;
  protected _commands: ICommand;
  protected _name: string;

  protected constructor(
    private readonly _dungeon: Dungeon,
    private readonly _players: Player[],
  ) {}

  //#region ACCESSOR

  public get Player(): Player {
    return this._player;
  }

  public set Player(value: Player) {
    this._player = value;
  }

  public get Opponents(): Player[] {
    return this._opponents;
  }

  public set Opponents(value: Player[]) {
    this._opponents = value;
  }

  public get Name(): string {
    return this._name;
  }

  public set Name(value: string) {
    this._name = value;
  }

  public get Dungeon(): Dungeon {
    return this._dungeon;
  }

  public get Players(): Player[] {
    return this._players;
  }

  public get Reply(): IReply {
    return this._reply;
  }

  public set Reply(value: IReply) {
    this._reply = value;
  }

  public get Commands(): ICommand {
    return this._commands;
  }

  public set Commands(value: ICommand) {
    this._commands = value;
  }

  //#endregion

  Update(): void {}

  Initialize(): void {
    this.Player = this.Players[0];
    this.Opponents = [...this.Players];
    this.Reply = { valid: false, flags: {} };
    this.Name = 'ROOT';
  }
}

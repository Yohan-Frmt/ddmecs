import { Dungeon, Player } from '@/Game';
import { IReply } from '@/Game/State/IReply';
import { State } from '@/Game/State/State';

export class RollDice extends State {
  public constructor(_dungeon: Dungeon, _players: Player[]) {
    super(_dungeon, _players);
  }

  public Initialize(): void {
    super.Initialize();
    this.Name = 'ROLL';
    this.Commands = {
      ROLL: this._roll,
    };
  }

  //
  // public updateDuelState = (command: any) =>
  //   this.commandList[command.action](command);
  //
  // private _getNextState(dice: Die[], sides: Side[]): DuelState {
  //   const dimensionedDice: Die[] = this._getDimensionedDice(dice, sides);
  //   if (this._canDimensionDice(dimensionedDice)) {
  //     return new DimensionState(
  //       this.duel,
  //       [this.player, this.opponent],
  //       dimensionedDice,
  //     );
  //   } else {
  //     return new DungeonState(this.duel, [this.player, this.opponent]);
  //   }
  // }
  //
  // private _canDimensionDice = (dice: Die[]): boolean => {
  //   const limit = this.player.hasDimensionedLimitBeenReached();
  //   return limit;
  // };
  //
  // private _getDimensionedDice = (dice: Die[], sides: Side[]): Die[] => {
  //   for (const y of range(5)) {
  //     const dimensionedDice = [];
  //     for (const [die, side] of aggregate(dice, sides)) {
  //       if (die.level === y && side.crest.isSummon()) {
  //         dimensionedDice.push(die);
  //       }
  //     }
  //     if (dimensionedDice.length >= 3) {
  //       return dimensionedDice;
  //     }
  //   }
  //   return [];
  // };
  //
  private _roll = (command: any): [IReply, State] => {
    console.log(command);
    return [{ valid: false, flags: {} }, this];
    //   this.reply.flags.log?.push('ROLL');
    //   const dice: Die[] = this._getDice(command['dice']);
    //   const sides: Side[] = this._rollDice(dice);
    //   const nextState: DuelState = this._getNextState(dice, sides);
    //   this.reply.valid = true;
    //   this.reply.flags.result = this.stateName;
    //   this.reply.flags.roll = sides.map((side: Side) => side.toObject());
    //   return [this.reply, nextState];
  };
  //
  // private _rollDice = (dice: Die[]): Side[] => {
  //   const sides: Side[] = [];
  //   for (const die of dice) {
  //     sides.push(die.roll());
  //   }
  //   for (const side of sides) {
  //     this.player.crests.addCrests(side);
  //   }
  //   return sides;
  // };
  //
  // private _getDice = (dice: number[]): Die[] => {
  //   if (dice.length !== new Set(dice).size) {
  //     throw Error('Duplicate Die');
  //   }
  //   const list: Die[] = [];
  //   for (const idx of dice) {
  //     const die: Die = this.player.dice[idx - 1];
  //     if (this.player.dimensionedDice.includes(die)) {
  //       throw Error('Die already used');
  //     }
  //     list.push(die);
  //   }
  //   return list;
  // };
}

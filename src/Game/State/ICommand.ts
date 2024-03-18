import { IReply } from '@/Game/State/IReply';
import { State } from '@/Game/State/State';

export interface ICommand {
  [key: string]: (command: any) => [IReply, State];
}

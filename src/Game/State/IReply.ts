import { ISideObject } from '@/Game';

export interface IReply {
  valid: boolean;
  flags: {
    result?: string;
    roll?: ISideObject[];
    monster?: string;
    origin?: [number, number];
    destination?: [number, number];
    log?: string[];
    target?: string;
    advantage?: string;
    damage?: number;
    kill?: boolean;
    counter?: boolean;
    defense?: number;
  };
}

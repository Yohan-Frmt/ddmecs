import { Engine } from '@/Game';
import { Settings } from '@/Utils';
import './normalize.scss';
import './style.scss';

new Engine(Settings.board.dungeon, [
  { username: 'Rybard', pool: Settings.player.default.pool },
  { username: 'Michel', pool: Settings.player.default.pool },
]).Initialize();

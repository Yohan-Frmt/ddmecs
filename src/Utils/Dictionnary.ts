/**
 * Dictionary with all crests to instantiate with
 // * @type {{A: AttackCrest, S: SummonCrest, D: Defense, T: TrapCrest, G: MagicCrest, M: MovementCrest}}
 */
export const crestsDictionary = {
  // A: AttackCrest,
  // D: DefenseCrest,
  // G: MagicCrest,
  // M: MovementCrest,
  // S: SummonCrest,
  // T: TrapCrest,
};

/**
 * Dictionary with all types of {@class Monster}
 * @type {string[]}
 */
export const monsterTypesDictionary = [
  'dragon',
  'zombie',
  'beast',
  'warrior',
  'spellcaster',
];

/**
 * Dictionary with all summon class of {@class Monster}
 // * @type {{warrior: Warrior, zombie: Zombie, dragon: Dragon, beast: Beast, spellcaster: Spellcaster}}
 */
export const monsterSummonDictionary = {
  // dragon: Dragon,
  // zombie: Zombie,
  // beast: Beast,
  // warrior: Warrior,
  // spellcaster: Spellcaster,
};

/**
 * Dictionary with all summon class of {@class Net}
 * @type {{FZ: NetFZ, T: NetT, W: NetW, X: NetX, Z2: NetZ2, Z3: NetZ3, X2: NetX2, Z: NetZ, W2: NetW2, T2: NetT2, T3: NetT3}}
 */
export const netDictionary = {
  // FZ: NetFZ,
  // T: NetT,
  // T2: NetT2,
  // T3: NetT3,
  // W: NetW,
  // W2: NetW2,
  // X: NetX,
  // X2: NetX2,
  // Z: NetZ,
  // Z2: NetZ2,
  // Z3: NetZ3,
};

/**
 * @deprecated
 * Dictionary with all icons used in the classes
 */
export const iconDictionnary = {
  crest_summon: '★',
  crest_movement: '⬆',
  crest_attack: '⚔',
  crest_defense: '⊝',
  crest_magic: '✡',
  crest_trap: '⊗',
};

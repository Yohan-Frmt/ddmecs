/**
 * Create an Array with a number sequence determine by number N
 * @param {number} n
 * @return {number[]}
 */
export const range = (n: number): number[] => [...Array(n).keys()];

/**
 * Convert Algebric Notation to more comprehensive Coords X,Y
 * For now no confirmation that X or Y are valid result. (Maybe later)
 * Example : g18 => x: 6, y: 17
 * @param {string} s
 * @return {[x: number, y: number]}
 */
export const convertANToCoords = (s: string): [x: number, y: number] => {
  const x = s[0].charCodeAt(0) - 97;
  const y = parseInt(s.substring(1), 10) - 1;
  return [x, y];
};

/**
 * Get random value from an array
 * @param {any[]} values
 * @return {any}
 */
export const random = (values: any[]): any => values[Math.floor(values.length * Math.random())];

/**
 *Aggregate all value in array
 * @param {any} rows
 * @return {any[]}
 */
export const aggregate = (...rows: any): any[] =>
  [...rows[0]].map((_, c) => rows.map((row: any) => row[c]));

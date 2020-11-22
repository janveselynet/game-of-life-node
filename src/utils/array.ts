export const getRandomElement = <T>(array: Array<T>): T => (
  array[Math.floor(Math.random() * array.length)]
);

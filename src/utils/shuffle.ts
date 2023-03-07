export function shuffle<T>(array: T[]) {
  const cloneArray = [...array];

  for (let i = 0; i < cloneArray.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloneArray[i], cloneArray[j]] = [cloneArray[j], cloneArray[i]];
  }

  return cloneArray;
}

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];

/** 7 -> "seven". Falls back to the digits above twenty. */
export const numberWord = (n: number) => WORDS[n] ?? String(n);

/** 7 -> "Seven" */
export const capitalWord = (n: number) => {
  const w = numberWord(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
};

/**
 *
 * @param text: a string that the first letter to needs to be uppercased
 * @returns: a new string with the uppercased first letter
 */
export const capitalise = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

/* Essential breakpoints dictionary */
export const BREAKPOINTS = {
  '1200': 1200,
  '1000': 1000,
  '768': 768,
  '600': 600
};

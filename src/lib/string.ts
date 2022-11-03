export const generateAcronym = (str: string): string => (str.match(/\b(\w)/g)?.join('') ?? '');

export default generateAcronym;

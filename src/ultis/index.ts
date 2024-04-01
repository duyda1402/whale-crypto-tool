export function shortenString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;

  const partLength = Math.floor((maxLength - 3) / 2); // Trừ 3 cho dấu '...'
  const start = str.slice(0, partLength);
  const end = str.slice(-partLength);
  return `${start}...${end}`;
}

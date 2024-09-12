export const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi"); // Case-insensitive search
  const parts = text.split(regex);

  return parts.map((part, index) => (part.toLowerCase() === searchTerm.toLowerCase() ? <strong key={index}>{part}</strong> : part));
};

export function amazonSearch(query: string) {
  const tag = import.meta.env.VITE_AMAZON_TAG;
  const href = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
  return tag ? `${href}&tag=${encodeURIComponent(String(tag))}` : href;
}

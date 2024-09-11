export const useSearch = () => useState(() => false);

export function toggleSearch() {
  useSearch().value = !useSearch().value;
}

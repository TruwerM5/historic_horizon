

export const useNavbar = () => useState("navbar", () => false);

export function toggleNavbar() {
  useNavbar().value = !useNavbar().value;
}

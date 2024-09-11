export const useCurrentTheme = () =>
  useState<"dark" | "light" | undefined>("theme", () => {
    return "light";
  });

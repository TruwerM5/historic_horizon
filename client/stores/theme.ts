export const useThemeStore = defineStore("theme", {
  state: () => {
    return {
      currentTheme: <string | null>null,
    };
  },

  actions: {
    setCurrentTheme() {
      let theme = localStorage.getItem("theme");
      if (theme) {
        this.currentTheme = theme;
      }
    },
  },
});

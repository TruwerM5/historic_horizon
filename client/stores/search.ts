export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      history: <string[]>[],
      isOpened: false,
    };
  },
  getters: {
    getLength: (state) => {
      return state.history.length > 0;
    },
  },
  actions: {
    loadHistory() {
      let story = localStorage.getItem("search");
      if (story) {
        this.history = JSON.parse(story);
      }
    },
    open(str: any) {
      // if(str.length > 0) {
      this.isOpened = true;
      // }
      return;
    },
    close() {
      this.isOpened = false;
      return;
    },
    addToHistory(queryString: string) {
      this.history.push(queryString);
      localStorage.setItem("search", JSON.stringify(this.history));
      console.log(this.getLength);
    },
    removeFromHistory(queryString: string) {
      this.history = this.history.filter((str: string) => str != queryString);
      localStorage.setItem("search", JSON.stringify(this.history));
      console.log("Deleted");
    },
  },
});

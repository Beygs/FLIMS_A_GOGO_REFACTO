import App from "./App";

class MoviesObserver {
  #observer: IntersectionObserver;
  lastElement: Element | null;

  constructor(private app: App) {
    this.#observer = this.#setObserver();
    this.lastElement = null;
  }

  #setObserver() {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio > 0.25 &&
            entry.target === this.lastElement
          ) {
            this.app.searchSection.page++;
            this.app.searchSection.search();
          }

          if (entry.intersectionRatio > 0.25) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: [0.25],
      }
    );
  }

  observe(entry: Element) {
    this.lastElement = entry;
    this.#observer.observe(entry);
  }

  unobserve(entry: Element) {
    this.#observer.unobserve(entry);
  }
}

export default MoviesObserver;

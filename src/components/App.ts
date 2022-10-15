import ArrowUp from "./ArrowUp";
import ArrowUpObserver from "./ArrowUpObserver";
import ImagesObserver from "./ImagesObserver";
import Modal from "./Modal";
import MoviesObserver from "./MoviesObserver";
import MoviesSection from "./MoviesSection";
import SearchSection from "./SearchSection";

class App {
  movies: Movie[];
  searchSection: SearchSection;
  moviesSection: MoviesSection;
  modal: Modal;
  arrowUp: ArrowUp;
  imagesObserver: ImagesObserver;
  moviesObserver: MoviesObserver;
  arrowUpObserver: ArrowUpObserver;

  constructor(private appElement: HTMLElement) {
    this.movies = [];
    this.searchSection = new SearchSection(this);
    this.moviesSection = new MoviesSection(this);
    this.modal = new Modal();
    this.arrowUp = new ArrowUp();
    this.imagesObserver = new ImagesObserver();
    this.moviesObserver = new MoviesObserver(this);
    this.arrowUpObserver = new ArrowUpObserver();
  }

  render() {
    this.appElement.innerHTML = /*html*/ `
      ${this.modal.render()}
      <main>
        ${this.searchSection.render()}
        <section class="movies">
          ${this.moviesSection.render()}
        </section>
        ${this.arrowUp.render()}
      </main>
    `;
  }

  hydrate() {
    const $moviesSection = document.querySelector("section.movies")!;

    $moviesSection.innerHTML = this.moviesSection.render();

    this.searchSection.destroy();
    this.moviesSection.destroy();
    this.modal.destroy();
    this.arrowUp.destroy();

    this.searchSection.destroy = this.searchSection.hydrate();
    this.moviesSection.destroy = this.moviesSection.hydrate();
    this.modal.destroy = this.modal.hydrate();
    this.arrowUp.destroy = this.arrowUp.hydrate();
  }
}

export default App;

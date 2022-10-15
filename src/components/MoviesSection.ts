import { typeTrad } from "../lib/utils";
import App from "./App";
import MovieDetails from "./MovieDetails";

class MoviesSection {
  destroy: () => void;

  constructor(private app: App) {
    this.destroy = () => {};
  }

  render() {
    if (this.app.movies.length === 0) return "";

    return this.app.movies
      .map((movie) => {
        const { Poster, Title, Type, Year, imdbID } = movie;

        return /*html*/ `
          <div class="movie">
            <img data-src="${
              Poster !== "N/A" ? Poster : "./assets/no_poster.png"
            }" src="/assets/no_poster.png" alt="Movie Poster" class="movie__poster lazy-image">
            <div class="movie__infos">
              <h3 class="movie__title">${Title}</h3>
              <h4>
                <span class="movie__type">${typeTrad[Type]}</span>
                <span class="movie__year">${Year}</span>
              </h4>
              <button id="${imdbID}" class="movie__more">En savoir plus</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  hydrate() {
    const $knowMoreBtns =
      document.querySelectorAll<HTMLButtonElement>(".movie__more")!;

    const $lazyImages =
      document.querySelectorAll<HTMLImageElement>(".lazy-image")!;

    const $movies = document.querySelectorAll(".movie");

    const handleClick = async (e: MouseEvent) => {
      const modal = new MovieDetails(
        this.app.movies.find(
          (movie) => movie.imdbID === (e.target as HTMLButtonElement).id
        ) as Movie
      );
      modal.render();
    };

    if ($movies.length > 0) this.app.arrowUpObserver.observeShow($movies[0]);

    $knowMoreBtns.forEach((btn) => {
      btn.addEventListener("click", handleClick);
    });

    $lazyImages.forEach((img) => {
      this.app.imagesObserver.observe(img);
    });

    $movies.forEach((movie) => {
      this.app.moviesObserver.observe(movie);
    });

    return () => {
      if ($movies.length > 0) this.app.arrowUpObserver.unobserveShow($movies[0]);

      $knowMoreBtns.forEach((btn) => {
        btn.removeEventListener("click", handleClick);
      });

      $lazyImages.forEach((img) => {
        this.app.imagesObserver.unobserve(img);
      });

      $movies.forEach((movie) => {
        this.app.moviesObserver.unobserve(movie);
      });
    };
  }
}

export default MoviesSection;

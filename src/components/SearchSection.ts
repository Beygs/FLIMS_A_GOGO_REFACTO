import Splitting from "splitting";
import { searchMovies } from "../lib/apiManager";
import App from "./App";

class SearchSection {
  page: number;
  lastQuery: string;
  destroy: () => void;

  constructor(private app: App) {
    this.page = 1;
    this.lastQuery = "";
    this.destroy = () => {};
  }

  render() {
    return /*html*/ `
    <section class="search-section">
      <div class="search-section__card">
        <h1 data-splitting>FLIMS A GOGO</h1>
        <form>
          <label for="movieSearch">Tu veux des infos sur quel flim ?</label>
          <input type="text" id="movieSearch" autocomplete="off" />
          <input type="submit" value="Chercher le flim" />
        </form>
      </div>
    </section>
    `;
  }

  hydrate() {
    Splitting();
    const $searchSection = document.querySelector("section.search-section")!;
    const $form = document.querySelector<HTMLFormElement>("form")!;
    const $input = document.querySelector<HTMLInputElement>("#movieSearch")!;

    const handleSubmit = async (e: SubmitEvent) => {
      e.preventDefault();

      this.page = 1;

      const $moviesSection = document.querySelector("section.movies")!;

      await this.search($input.value);

      this.lastQuery = $input.value;
      $input.value = "";

      $moviesSection.scrollIntoView({ behavior: "smooth" });
    };

    $form.addEventListener("submit", handleSubmit);

    this.app.arrowUpObserver.observeHide($searchSection);

    return () => {
      $form.removeEventListener("submit", handleSubmit);
      this.app.arrowUpObserver.unobserveHide($searchSection);
    };
  }

  async search(query?: string) {
    if (query) {
      try {
        const movies = await searchMovies(query, this.page);
        if (!movies.Search) throw new Error(movies.Error);
        this.app.movies = movies.Search;
        this.app.hydrate();
      } catch (err) {
        this.app.moviesObserver.lastElement = null;
        console.error(err);
      }
    } else {
      try {
        const movies = await searchMovies(this.lastQuery, this.page);
        if (!movies.Search) throw new Error(movies.Error);
        this.app.movies.push(...movies.Search);
        this.app.hydrate();
      } catch (err) {
        this.app.moviesObserver.lastElement = null;
        console.error(err);
      }
    }

  }
}

export default SearchSection;

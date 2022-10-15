import { getMovie } from "../lib/apiManager";
import { flag } from "country-emoji";
import { ratedIconsSrc, typeTrad } from "../lib/utils";

class MovieDetails {
  constructor(private movie: Movie) {}

  async #getDetails() {
    this.movie.details = await getMovie(this.movie.imdbID);
  }

  async render() {
    const $modal = document.querySelector(".modal")!;
    const $modalPoster = $modal.querySelector("img")!;
    const $modalContent = $modal.querySelector(".content")!;
    $modal.classList.add("active");

    if (!this.movie.details) {
      $modalContent.innerHTML = "Loading...";
      $modalPoster.src = "";
      await this.#getDetails();
    }

    const {
      Actors,
      Awards,
      BoxOffice,
      Country,
      Director,
      Genre,
      Plot,
      Poster,
      Rated,
      Runtime,
      Title,
      Type,
      Writer,
      Year,
    } = this.movie.details!;

    const countryFlag = flag(Country.split(",")[0]) ?? "🏳️";

    if (Poster !== "N/A") {
      $modalPoster.src = Poster;
    } else {
      $modalPoster.src = "/assets/no_poster.png";
    }

    $modalContent.innerHTML = /*html*/ `
      <h3 class="title">${Title}</h3>
      <p class="type">(${typeTrad[Type]})</p>
      <p class="details">
        <span class="year">${Year}</span>&#32;
        <span class="genre">${Genre}</span>&#32;
        <span class="duration">${Runtime}</span>&#32;
        <img class="rated" src=${ratedIconsSrc(Rated)}>&#32; 
      </p>
      <p class="director">🎬 Réalisateur(s): ${Director}</p>
      <p class="actors">🎥 Acteurs: ${Actors}</p>
      <p class="writer">🗒️ Auteur(s): ${Writer}</p>
      <p class="country">${countryFlag} Pays: ${Country}</p>
      <p class="box-office">🤑 Moula engrangée: ${BoxOffice}</p>
      <p class="awards">🏆 Prix: ${Awards}</p>
      <p class="plot">${Plot}</p>
    `;
  }
}

export default MovieDetails;

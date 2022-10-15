/// <reference types="vite/client" />

declare module "country-flag-emoji";
declare module "splitting";

interface countryFlagData {
  code: string;
  emoji: string;
  unicode: string;
  name: string;
}

type Rated =
  | "G"
  | "PG"
  | "PG-13"
  | "R"
  | "NC-17"
  | "Not Rated"
  | "N/A"
  | "TV-Y"
  | "TV-Y7"
  | "TV-Y7FG"
  | "TV-G"
  | "TV-PG"
  | "TV-14"
  | "TV-MA";

interface Movie {
  Poster: string;
  Title: string;
  Type: "movie" | "series" | "game";
  Year: string;
  imdbID: string;

  details?: {
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    Director: string;
    Genre: string;
    Plot: string;
    Poster: string;
    Rated: Rated;
    Runtime: string;
    Title: string;
    Type: "movie" | "series" | "game";
    Writer: string;
    Year: string;
    Response: "True" | "False";
    imdbID: string;
  };
}

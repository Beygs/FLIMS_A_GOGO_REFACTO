export const typeTrad = {
  movie: "flim",
  series: "paflim",
  game: "jeu",
};

export const ratedIconsSrc = (code: Rated): string => {
  const ratedIcons = {
    G: "mpaa-g",
    PG: "mpaa-pg",
    "PG-13": "mpaa-pg13",
    R: "mpaa-r",
    "NC-17": "mpaa-nc17",
    "Not Rated": "mpaa-nr",
    "N/A": "mpaa-unrated",
    "TV-Y": "tv-y",
    "TV-Y7": "tv-y7",
    "TV-Y7FG": "tv-y7fg",
    "TV-G": "tv-g",
    "TV-PG": "tv-pg",
    "TV-14": "tv-14",
    "TV-MA": "tv-ma",
  };

  return `/assets/${ratedIcons[code]}.png`;
};

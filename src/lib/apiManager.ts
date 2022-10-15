export const searchMovies = async (query: string, page: number): Promise<{ Search?: Movie[]; Error?: string }> => {
  const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}&page=${page}`;
  const data = await fetch(url);
  return data.json();
}

export const getMovie = async (imdbId: string): Promise<Movie["details"]> => {
  const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${imdbId}`;
  const data = await fetch(url);
  return data.json();
}
